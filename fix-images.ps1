$ErrorActionPreference = "Stop"

$htmlFiles = @("index.html", "about.html", "products.html", "dealership.html")
$imagesDir = "images"

if (-not (Test-Path -Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $regex = 'src="file:///(C:/Users/HP/\.gemini/antigravity/brain/[^"]+\.(png|jpg|jpeg|svg))"'
        $matches = [regex]::Matches($content, $regex)
        
        $modified = $false
        foreach ($match in $matches) {
            $fullUrl = $match.Groups[1].Value
            $localPath = $fullUrl -replace '/', '\'
            
            $fileName = Split-Path $localPath -Leaf
            $newRelPath = "images/$fileName"
            
            if (Test-Path $localPath) {
                Copy-Item -Path $localPath -Destination "$imagesDir\$fileName" -Force
                Write-Host "Copied $fileName"
            }
            
            $content = $content.Replace($match.Value, "src=""$newRelPath""")
            $modified = $true
        }
        
        if ($modified) {
            Set-Content -Path $file -Value $content
            Write-Host "Updated $file"
        }
    }
}
