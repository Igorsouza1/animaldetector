@echo off
setlocal EnableDelayedExpansion

REM Defina as variáveis de ambiente
set MAMBAFORGE_PATH=C:\Users\IHP-Sistemas\miniforge3
set MODEL_PATH=C:\megadetector\md_v5a.0.0.pt
set MEGADETECTOR_PATH=C:\git\MegaDetector

set IMAGE_FOLDER=C:\Users\IHP-Sistemas\Desktop\teste
set OUTPUT_PATH=C:\Users\IHP-Sistemas\Desktop\teste\output.json

REM Ativar o ambiente Miniforge
call %MAMBAFORGE_PATH%\Scripts\activate.bat
call conda activate cameratraps-detector

REM Configurar PYTHONPATH
set PYTHONPATH=%MEGADETECTOR_PATH%;C:\git\yolov5

REM Executar o MegaDetector
cd /d %MEGADETECTOR_PATH%\detection
python run_detector_batch.py %MODEL_PATH% %IMAGE_FOLDER% %OUTPUT_PATH% --output_relative_filenames --recursive --checkpoint_frequency 500 --quiet


endlocal
