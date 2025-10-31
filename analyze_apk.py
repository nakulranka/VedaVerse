import zipfile
import os
import json
import xml.etree.ElementTree as ET
from pathlib import Path

def analyze_apk(apk_path, output_dir):
    """
    Basic APK analysis using zipfile (APK is essentially a ZIP)
    """
    print(f"Analyzing APK: {apk_path}")
    
    # Create output directory
    Path(output_dir).mkdir(exist_ok=True)
    
    analysis_report = {
        "package_name": "",
        "app_name": "",
        "version": "",
        "activities": [],
        "resources": {
            "layouts": [],
            "images": [],
            "strings": {}
        },
        "assets": []
    }
    
    try:
        with zipfile.ZipFile(apk_path, 'r') as apk_zip:
            # List all files in APK
            file_list = apk_zip.namelist()
            print(f"Total files in APK: {len(file_list)}")
            
            # Extract key files
            key_files = [
                'AndroidManifest.xml',
                'resources.arsc',
                'classes.dex'
            ]
            
            # Extract all files to analyze structure
            apk_zip.extractall(output_dir)
            
            # Analyze manifest (binary, but we can get some info)
            if 'AndroidManifest.xml' in file_list:
                print("Found AndroidManifest.xml")
            
            # Find layouts
            layouts = [f for f in file_list if f.startswith('res/layout/') and f.endswith('.xml')]
            analysis_report["resources"]["layouts"] = layouts
            print(f"Found {len(layouts)} layout files")
            
            # Find images/drawables
            images = [f for f in file_list if f.startswith('res/drawable') or f.startswith('res/mipmap')]
            analysis_report["resources"]["images"] = images
            print(f"Found {len(images)} image resources")
            
            # Find assets
            assets = [f for f in file_list if f.startswith('assets/')]
            analysis_report["assets"] = assets
            print(f"Found {len(assets)} asset files")
            
            # Check for common files
            common_files = {
                'strings.xml': [f for f in file_list if 'strings.xml' in f],
                'colors.xml': [f for f in file_list if 'colors.xml' in f],
                'styles.xml': [f for f in file_list if 'styles.xml' in f],
            }
            
            for file_type, files in common_files.items():
                if files:
                    print(f"Found {len(files)} {file_type} files")
    
    except Exception as e:
        print(f"Error analyzing APK: {e}")
    
    # Save analysis report
    with open(os.path.join(output_dir, 'analysis_report.json'), 'w') as f:
        json.dump(analysis_report, f, indent=2)
    
    return analysis_report

if __name__ == "__main__":
    apk_path = "app-release-1.apk"
    output_dir = "decompiled_apk"
    
    if os.path.exists(apk_path):
        report = analyze_apk(apk_path, output_dir)
        print("\nAnalysis complete!")
        print(f"Results saved to: {output_dir}/analysis_report.json")
    else:
        print(f"APK file not found: {apk_path}")