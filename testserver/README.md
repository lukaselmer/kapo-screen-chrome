# Testserver

## Setup

### Data

Since the data for the testserver cannot be open-sourced (not our software, not our call), the data had
to be encrypted. It is stored in the private repository https://github.com/lukaselmer/kapo-screen-admin.
Contact lukas.elmer@gmail.com or lukas@elmer.app if you are eligable to have access to it.

The data was encrypted using 7zip AES256. Decrypt it using 7zip with the password, and put the decrypted
content in a directory called `data`, so that the path `<git-repo>/testserver/data/index.html` exists.

### SSL Cert & Key

To run the server, a certificate `cert.pem` and a key `key.pem` are needed. Generate them using:

```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

See https://github.com/http-party/http-server#tlsssl for more details.

## Usage

Use the testserver to for local development:

- yarn http
- yarn https

Available urls:

- http://<IP>
- http://<IP>/GMSC/Workflows/Form?options
- https://<IP>
- https://<IP>/GMSC/Workflows/Form?options
