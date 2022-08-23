FROM rust:latest as builder
WORKDIR /usr/src/quanta
COPY . .
RUN cargo install --path .

FROM debian:buster-slim
COPY --from=builder /usr/local/cargo/bin/quanta /usr/local/bin/quanta
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["quanta"]