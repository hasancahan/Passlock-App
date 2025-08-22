!macro customInstall
  ; Kurulum sonrası özel işlemler
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "DisplayName" "HD Passlock"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "UninstallString" "$INSTDIR\Uninstall.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "DisplayIcon" "$INSTDIR\HD Passlock.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "Publisher" "HDynamicX"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "DisplayVersion" "1.0.0"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "EstimatedSize" "100"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "NoModify" "1"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock" \
                     "NoRepair" "1"
!macroend

!macro customUnInstall
  ; Kaldırma sonrası özel işlemler
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\HD Passlock"
!macroend
