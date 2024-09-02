#!/usr/bin/env python 

import subprocess

def build_and_deploy(image_name, dockerfile_path='.'):
    try:
        # Build the Docker image
        build_command = ['docker', 'build', '-t', image_name, dockerfile_path]
        subprocess.run(build_command, check=True)
        
        # Push the Docker image
        push_command = ['docker', 'push', image_name]
        subprocess.run(push_command, check=True)
        
        print(f"Successfully built and pushed {image_name}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to build and push image: {e}")
        exit(1)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Build and deploy Docker image.')
    parser.add_argument('image_name', type=str, help='Name of the Docker image')
    parser.add_argument('--dockerfile_path', type=str, default='.', help='Path to the Dockerfile')

    args = parser.parse_args()

    build_and_deploy(args.image_name, args.dockerfile_path)