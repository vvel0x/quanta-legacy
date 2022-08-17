#[macro_use] extern crate rocket;

mod db;
use std::env;
use redis::Commands;
use rocket::response::Redirect;

#[get("/")]
fn index() -> Result<Redirect, String> {
    let default_url = env::var("DEFAULT_URL");
    match default_url {
        Ok(url) => Ok(Redirect::temporary(url)),
        _ => Err(format!("No default redirect defined!"))
    }
}

#[get("/<slug>")]
fn fetch_url(slug: &str) -> Result<Redirect, Redirect> {
   let mut conn = db::connect();
   let res: Result<String, _> = conn.get(slug);

   match res {
    // Using temporary redirects to allow counting hits
    Ok(url) => Ok(Redirect::temporary(url)),
    _ => Err(Redirect::to("/")),
   }
}

// Heartbeat to allow to hcheck the health of the service
#[get("/_status")]
fn heartbeat() -> String {
    format!("Ok!")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
    .mount("/", routes![index, heartbeat])
    .mount("/", routes![fetch_url])
}
