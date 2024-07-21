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

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres-deployment
  labels:
    app: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres-todo
        image: viktormandlbauer/pg_app_todo:latest
        env:
        - name: POSTGRES_DB
          value: todo
        - name: POSTGRES_USER
          value: todo
        - name: POSTGRES_PASSWORD
          value: todo
        ports:
        - containerPort: 5432
        volumeMounts:
        - mountPath: /var/lib/postgresql/data
          name: postgres-storage
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
