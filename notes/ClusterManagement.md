# Cluster Management

## Cluster Setup

```bash
# Create cluster with 2 agent nodes
k3d cluster create -a 2

# Start cluster
k3d cluster start

# Stop cluster
k3d cluster stop

# Delete cluster
k3d cluster delete

# Create cluster with port-forwarding
# <host-port>:<port>@<cluster_resource>
k3d cluster create --api-port 6550 --port 30000:30000@agent:0 --port 30001:30001@agent:1 --port 80:80@loadbalancer --agents 2
```

## Cluster Info

```bash
# View cluster info
kubectl cluster-info

# View cluster config
kubectl config view

# View cluster pods
kubectl get pods --all-namespaces

# View cluster nodes
kubectl get nodes -o wide

```

### What is k3d?

k3d makes it very easy to create single- and multi-node k3s clusters in docker, e.g. for local development on Kubernetes.

---

## Sources

- <https://github.com/k3d-io/k3d>
