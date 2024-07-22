# Cluster Management

## Basic operations

```bash
# Create cluster with 2 agent nodes
k3d cluster create -a 2

# Start cluster
k3d cluster start

# Stop cluster
k3d cluster stop

# View cluster info
kubectl cluster-info

# View cluster config
kubectl config view

# View cluster pods
kubectl get pods --all-namespaces

# Delete cluster
k3d cluster delete

# Create cluster with port-forwarding configured
k3d cluster create --port 8082:3000@agent:0 -p 8081:80@loadbalancer --agents 2
```

### What is k3d?¶

k3d is a lightweight wrapper to run k3s (Rancher Lab’s minimal Kubernetes distribution) in docker.

k3d makes it very easy to create single- and multi-node k3s clusters in docker, e.g. for local development on Kubernetes.

---

## Sources

- <https://github.com/k3d-io/k3d>
