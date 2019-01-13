Setup DB

kubectl -n kube-system get po

helm init

helm install --name security-db stable/mongodb

Create user in mongodb
use admin;

db.createUser({ user: 'jphan', pwd: 'someyoungguy', roles: [ "userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase" ] });

Create SSL certs using the following commands.

openssl req \
       -newkey rsa:2048 -nodes -keyout green-labs_io.key \
       -out green-labs_io.csr

openssl x509 \
       -signkey green-labs_io.key \
       -in green-labs_io.csr \
       -req -days 365 -out green-labs_io.crt

Upload SSL crts (did'nt check in my keys for abious resons)

cat tmp-green-labs_io.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > green-labs_io.crt

kubectl create secret tls nginxsecret --key green-labs_io.key  --cert green-labs_io.crt

upload config

kubectl create -f sec-ms-proxy-configmap.yaml

Create container first

kubectl create -f security-ms.yaml

Create proxies after.

kubectl create -f sec-ms-proxy.yaml

