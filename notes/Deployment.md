# Deployment

## Basic operations

### Imperative approach

```bash
# Create deployment with image
kubectl create deployment <deployment-name> --image=<image-name>

# Show deployments
kubectl get deployments

# Delete deployment
kubectl delete deployment <deployment-name>

# Setting 1 replica
kubectl scale deployment <deployment-name> --replicas 1

# Restart rollout of existing deployment
kubectl rollout restart deployment <deployment-name>
```

### Declarative approach

Create a deployment.yaml for declarative deployments.

#### deployment.yaml

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <deployment-name>
  labels:
    app: <app-name>
spec:
  replicas: 1
  selector:
    matchLabels:
      app: <app-name>
  template:
    metadata:
      labels:
        app: <app-name>
    spec:
      containers:
      - name: <container-name>
        image: <publisher>/<image>:<tag>
        env:
        - name: <NAME>
          value: <value>
        ...
        ports:
        - containerPort: <container-port>
        volumeMounts:
        - mountPath: <container-persistent-data-path>
          name: <storage-name>
```

```bash
# Apply deployment declaration
kubectl apply -f manifests/deployment.yaml
```

## Pods

```bash
# Show existings pods
kubectl get pods

# Follow log
kubectl logs <pod-name> --follow
```

---

### Sources

- <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>

## Secrets

```yaml
# ...
containers:
  - name: imageagain
    env:
      - name: API_KEY # ENV name passed to container
        valueFrom:
          secretKeyRef:
            name: pixabay-apikey
            key: API_KEY # ENV name in the secret
```

```bash
sops --encrypt --age <public-key> --encrypted-regex '^(data)$' secret.yaml

export SOPS_AGE_KEY_FILE=~/kubernetes/.secret-key.txt

sops --decrypt secrets.enc.yaml | kubectl apply -f -
```
