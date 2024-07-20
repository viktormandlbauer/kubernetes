# Deployment

## Basic operations

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

## Pods

```bash
# Show existings pods
kubectl get pods

```

---

### Sources

- <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>
