$sourceDir = (Resolve-Path 'out').Path
$destZip = Join-Path (Resolve-Path '.').Path 'out_deploy.zip'
$hostEasyZip = Join-Path (Resolve-Path '.').Path 'hosteasy_deploy.zip'

if (Test-Path $destZip) { Remove-Item $destZip -Force }
if (Test-Path $hostEasyZip) { Remove-Item $hostEasyZip -Force }

Write-Host "Creating deployment package from $sourceDir..."

# Use System.IO.Compression for fast zip
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($sourceDir, $destZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Copy-Item $destZip $hostEasyZip -Force

$zipInfo = Get-Item $destZip
Write-Host "Created out_deploy.zip and hosteasy_deploy.zip successfully. Size: $([math]::Round($zipInfo.Length / 1MB, 2)) MB"
