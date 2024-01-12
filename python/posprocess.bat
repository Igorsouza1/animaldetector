@echo off
setlocal EnableDelayedExpansion

REM Defina as variáveis de ambiente
set MAMBAFORGE_PATH=C:\Users\IHP-Sistemas\miniforge3
set MODEL_PATH=C:\megadetector\md_v5a.0.0.pt
set MEGADETECTOR_PATH=C:\git\MegaDetector

set IMAGE_FOLDER=C:\Users\IHP-Sistemas\Desktop\teste
set OUTPUT_PATH=C:\Users\IHP-Sistemas\Desktop\teste\output.json

set ORGANIZATION=C:\Users\IHP-Sistemas\Desktop\Novapasta

REM Ativar o ambiente Miniforge
call %MAMBAFORGE_PATH%\Scripts\activate.bat
call conda activate cameratraps-detector

REM Configurar PYTHONPATH
set PYTHONPATH=%MEGADETECTOR_PATH%;C:\git\yolov5

cd /d %MEGADETECTOR_PATH%
python api\batch_processing\postprocessing\separate_detections_into_folders.py %OUTPUT_PATH% %IMAGE_FOLDER% %ORGANIZATION% --move_images --allow_existing_directory


endlocal