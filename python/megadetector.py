import subprocess
from pathlib import Path
import sys
import os

def update_batch_files(variaveis_batch_path, posprocess_batch_path, image_folder_path, output_path):
    # Lê o conteúdo dos arquivos BAT e atualiza-os
    for batch_path in [variaveis_batch_path, posprocess_batch_path]:
        with open(batch_path, 'r') as file:
            lines = file.readlines()

        with open(batch_path, 'w') as file:
            for line in lines:
                if line.startswith('set IMAGE_FOLDER='):
                    file.write(f'set IMAGE_FOLDER={image_folder_path}\n')
                elif line.startswith('set OUTPUT_PATH='):
                    file.write(f'set OUTPUT_PATH={output_path}\n')
                else:
                    file.write(line)

def run_megadetector(batch_script_path):
    subprocess.run(batch_script_path, shell=True)

def check_for_media_and_run(folder_path, variaveis_batch_path, posprocess_batch_path):
    # Lista de extensões de arquivo para verificar
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.mp4']
    files = [file for ext in extensions for file in Path(folder_path).glob(ext)]
    print("Diretório de trabalho atual:", os.getcwd())
    if files:
        print("Arquivos de mídia encontrados. Atualizando e executando o MegaDetector...")
        output_path = str(Path(folder_path) / "output.json")
        update_batch_files(variaveis_batch_path, posprocess_batch_path, folder_path, output_path)
        run_megadetector(variaveis_batch_path)
    else:
        print("Erro: Não foi encontrado nenhuma imagem ou vídeo na pasta especificada.")

# Configurações

if __name__ == '__main__':
    # Substitua pelos caminhos corretos se passados como argumentos
    image_folder = sys.argv[1]
    variaveis_batch_path = 'C:/Users/IHP-Sistemas/Desktop/Animal Detector/python/variaveis.bat'
    posprocess_batch_path = 'C:/Users/IHP-Sistemas/Desktop/Animal Detector/python/variaveis.bat'

    # Verifica se há imagens ou vídeos e executa o detector
    check_for_media_and_run(image_folder, variaveis_batch_path, posprocess_batch_path)
