# Deployment

## Basic operations

### Imperative approach

```bash
# Create deployment with image
kubectl create deployment my-dep --image=<image-name>

# Show deployments
kubectl get deployments

# Delete deployment
kubectl delete deployment my-dep

# Setting 1 replica
kubectl scale deployment my-dep --replicas 1 
```

## Declarative approach

Create a deployment.yaml for declarative deployments.

### deployment.yaml

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
kubectl logs nodejs-dep-69959547d4-v2zrv --follow
```

---

### Sources

- <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>
