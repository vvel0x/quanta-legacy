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
   let key = format!("quanta:{}", slug);
   let fetch_link: Result<String, _> = conn.hget(&key, "url");

   match fetch_link {
    Ok(url) => Ok({
        let _ : () = conn.hincr(&key, "hits", 1).expect("Unable to increment counter!");
        Redirect::temporary(url) // Using temporary redirects to allow counting hits
    }),
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
    println!("Starting Quanta engine...");
    rocket::build()
    .mount("/", routes![index, heartbeat])
    .mount("/", routes![fetch_url])
}