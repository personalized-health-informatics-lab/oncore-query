# OnCore Patient Facing - OnCore Query
The OnCore Query is a web application that makes it easy for patients and clinicians to search for clinical trials; using keywords or other search terms, this tool will provide names of trials, status, phase, treatment type and more.

## Installation
This installation guide was created for and tested on Ubuntu operating systems.

### 1. Packages/Dependencies
Please read [Node.js Docs](https://nodejs.org/en/download/package-manager/) for installing Node.js on your system.

Import node.js repository:
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
```
Install the required packages:
```
sudo apt-get install -y nodejs
```

### 2. OnCore Query
Install the dependencies in the local node_modules folder:
```
npm install
```
Configure your own OnCore database connection:
```
vim config/settings.json.example
cp config/settings.json.example config/settings.json
```
Compile static files:
```
npm run build
```
### 3. Web Server
If you cannot or do not want to use Nginx as your web server, please configure apache yourself.

Install nginx through package manager:
```
sudo apt-get install -y nginx
```
Copy the example site config:
```
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/oncore
sudo ln -s /etc/nginx/sites-available/oncore /etc/nginx/sites-enabled/oncore
```
Make sure to edit the config file to match your setup, if you are running multiple nginx sites remove the `default_server` argument from the `listen` directives:
```
# Change domain name of your host serving oncore query.
sudo vim /etc/nginx/sites-available/oncore
```
Add reverse proxy for our program:
```
location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
}
```
Validate your Nginx config file with the following command:
```
sudo nginx -t
```
You should receive `syntax is okay` and `test is successful` messages.

Restart your server:
```
sudo service nginx restart
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to pass all linting test.

## License
[MIT](https://choosealicense.com/licenses/mit/)