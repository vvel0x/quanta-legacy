extern crate redis;

use std::env;

pub fn connect() -> redis::Connection {
    let hostname = env::var("REDIS_HOST").unwrap_or("localhost".to_string());
    let passwd   = env::var("REDIS_PASS").unwrap_or_default();
    let scheme   = match env::var("IS_SECURE") {
        Ok(_) => "rediss",
        Err(_) => "redis",
    };

    let conn_uri = format!("{}://:{}@{}", scheme, passwd, hostname);

    redis::Client::open(conn_uri)
        .expect("Invalid connection url")
        .get_connection()
        .expect("Failed to connect to Redis!")
}