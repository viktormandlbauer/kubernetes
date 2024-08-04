# Debugging

## General

```sh
kubectl get

kubectl describe

kubectl logs
```

## Cluster

```sh
kubectl cluster-info

kubectl cluster-info dump
```

## Nodes

```sh
# Get nodes
kubectl get nodes -o wide

# Node information
kubectl describe nodes <nodename>
```

## Pods

```sh
# Show pods
kubectl get pods -o wide

# Show pod logs 
kubectl logs pods/<pod-name>

# Show more information about the pod
kubectl describe pods/<pod-name>
```

## Network

```sh
# Show services
kubectl get service -o wide

# Describe services
kubectl describe svc/<svc-name>
```

The `busybox` image can be used for testing network connectivity between pods.

```yaml
# Creates a pod with the busybox images
apiVersion: v1
kind: Pod
metadata:
  name: my-busybox
  labels:
    app: my-busybox
spec:
  containers:
  - image: busybox
    command:
      - sleep
      - "3600"
    imagePullPolicy: IfNotPresent
    name: busybox
  restartPolicy: Always
```

It provides some basic network utilities for debugging:

```sh
# Test TCP connection to another service
kubectl exec -it my-busybox -- nc -v <svc-name/svc-ip/pod-ip> <port> 

# Test HTTP response from another service
kubectl exec -it my-busybox -- wget -qO - http://<svc-name/svp-ip/pod-ip>:<port>

# Interactive mode
kubectl exec -it my-busybox sh

# Delete the debugging pod
kubectl delete pod/my-busybox
```
