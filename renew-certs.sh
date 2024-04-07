docker run -it --rm \
-v "$(pwd)/certbot/conf:/etc/letsencrypt" \
-v "$(pwd)/certbot/www:/var/www/certbot" \
certbot/certbot renew \
--webroot -w /var/www/certbot