# Debugging

## General

```bash
kubectl describe

kubectl logs
```

## Cluster

```bash
kubectl cluster-info

kubectl cluster-info dump
```

## Nodes

```bash
# Get nodes
kubectl get nodes -o wide

# Node information
kubectl describe nodes <nodename>
```
