# Storage

## Persistent Volumes

Prerequisite for using local filesystem storage on a Kubernetes cluster:

```bash
# Replace <node-name> with the name of your Kubernetes node
docker exec <node-name> mkdir -p /tmp/project
docker exec <node-name> mkdir -p /tmp/experimental
```

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: <pv-name>
spec:
  storageClassName: <storageclass-name> # Referenced by pvc 
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  local:
    path: <local-filesystem-path>
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - <node-name1>
          - <node-name2>
```

### Persistent Volumes Claim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim 
metadata:
<<<<<<< HEAD
  name: <pvc-name>
spec:
  storageClassName: <storageclass-name-reference>
=======
  name: <claim-name>
spec:
  storageClassName: <persistent-volume>
>>>>>>> 93c4c6e01b6cf985fe9411421b270874235d5393
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Use it in deployments like

```yaml
# ...
    spec:
      volumes:
        - name: <volume-name>
          persistentVolumeClaim:
            claimName: <pvc-name>
      containers:
        - name: <container-name>
<<<<<<< HEAD
          image: <image-name>:<image-tag>
=======
          image: <image-name:image-tag>
>>>>>>> 93c4c6e01b6cf985fe9411421b270874235d5393
          volumeMounts:
          - name: <volume-name>
            mountPath: /usr/src/app/files
<<<<<<< HEAD
        - name: <container-name>
          image: <image-name>:<image-tag>
=======
        - name: image-response
          image: <imageName:imagetag>
>>>>>>> 93c4c6e01b6cf985fe9411421b270874235d5393
          volumeMounts:
          - name: <volume-name>
            mountPath: /usr/src/app/files
```