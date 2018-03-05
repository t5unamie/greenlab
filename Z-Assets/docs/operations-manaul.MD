# Operations Manaul

# Roll new nginx configs

* Step 1 - Make the nessary changes to fe-ms-configmap.yaml or sec-ms-proxy-configmap.yaml. then run the following command.
```bash
kubectl replace configmap -f <PATH TO YAML>

Example below

kubectl replace configmap -f fe-ms/fe-ms-configmap.yaml
```