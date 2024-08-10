# Storage

## Persistent Volumes

```yaml

apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  storageClassName: my-example-pv
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  local:
    path: /tmp/kube
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - k3d-k3s-default-agent-0
```

### Persistent Volumes Claim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: <claim-name>
spec:
  storageClassName: <persistent-volume>
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
      volumes:-
        - name: shared-image
          persistentVolumeClaim:
            claimName: image-claim
      containers:
        - name: <container-name>
          image: <image-name:image-tag>
          volumeMounts:
          - name: shared-image
            mountPath: /usr/src/app/files
        - name: image-response
          image: <imageName:imagetag>
          volumeMounts:
          - name: shared-image
            mountPath: /usr/src/app/files
```

