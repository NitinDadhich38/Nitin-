$htmlFiles = Get-ChildItem -Path 'out' -Recurse -Filter '*.html' | Where-Object { $_.Name -ne 'index.html' -and $_.Name -ne '404.html' }
$count = 0
foreach ($file in $htmlFiles) {
    $folderName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $parentDir = $file.DirectoryName
    $targetDir = Join-Path $parentDir $folderName
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }
    $targetIndex = Join-Path $targetDir 'index.html'
    Copy-Item $file.FullName $targetIndex -Force
    $count++
}
Write-Host "Created $count clean folder routes with index.html."

# Also ensure /project/PRAN-XXXX works
if (!(Test-Path 'out\project')) { New-Item -ItemType Directory -Path 'out\project' -Force | Out-Null }
$pranFiles = Get-ChildItem -Path 'out' -Filter 'PRAN-*.html'
foreach ($f in $pranFiles) {
    $code = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $projDir = Join-Path 'out\project' $code
    if (!(Test-Path $projDir)) { New-Item -ItemType Directory -Path $projDir -Force | Out-Null }
    Copy-Item $f.FullName (Join-Path $projDir 'index.html') -Force
}
Write-Host "Created project/PRAN-* alias routes."
