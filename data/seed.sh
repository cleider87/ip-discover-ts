echo "Importing asn_ipv4"
psql postgresql://postgres:administrator@localhost:5432/ip-discovery \
    -c "\\copy asn_ipv4(ip_range_start,ip_range_end,as_number,as_organization) FROM 'dbip-asn-ipv4.csv' WITH CSV HEADER DELIMITER ','"
echo "Importing cities_ipv4"
psql postgresql://postgres:administrator@localhost:5432/ip-discovery \
    -c "\\copy cities_ipv4(ip_range_start, ip_range_end, country_code, state1, state2, city, postcode, latitude, longitude, timezone) FROM 'geolite2-city-ipv4.csv' WITH CSV HEADER DELIMITER ','"