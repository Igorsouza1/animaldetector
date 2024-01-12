import subprocess
import sys

def update_batch_file(batch_file_path, organization_path):
    with open(batch_file_path, 'r') as file:
        lines = file.readlines()

    with open(batch_file_path, 'w') as file:
        for line in lines:
            if line.startswith('set ORGANIZATION='):
                file.write(f'set ORGANIZATION={organization_path}\n')
            else:
                file.write(line)

def run_postprocess_script(batch_script_path):
    subprocess.run(batch_script_path, shell=True)

if __name__ == '__main__':
    posprocess_batch_path = 'C:/Users/IHP-Sistemas/Desktop/Animal Detector/python/posprocess.bat'
    organization_path = sys.argv[1] 

    update_batch_file(posprocess_batch_path, organization_path)
    run_postprocess_script(posprocess_batch_path)
