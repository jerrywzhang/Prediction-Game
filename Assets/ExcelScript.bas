Attribute VB_Name = "Module1"
Sub SeparateUsersIntoSheets()
'Update by Extendoffice 2018/3/2
    Dim xRCount As Long
    Dim xSht As Worksheet
    Dim xNSht As Worksheet
    Dim I As Long
    Dim xTRrow As Integer
    Dim xCol As New Collection
    Dim xTitle As String
    Dim xSUpdate As Boolean
    Set xSht = ActiveSheet
    On Error Resume Next
    xRCount = xSht.Cells(xSht.Rows.Count, 1).End(xlUp).Row
    xTitle = "A1:J1"
    xTRrow = xSht.Range(xTitle).Cells(1).Row
    For I = 2 To xRCount
        Call xCol.Add(xSht.Cells(I, 1).Text, xSht.Cells(I, 1).Text)
    Next
    xSUpdate = Application.ScreenUpdating
    Application.ScreenUpdating = False
    For I = 1 To xCol.Count
        Call xSht.Range(xTitle).AutoFilter(1, CStr(xCol.Item(I)))
        Set xNSht = Nothing
        Set xNSht = Worksheets(CStr(xCol.Item(I)))
        If xNSht Is Nothing Then
            Set xNSht = Worksheets.Add(, Sheets(Sheets.Count))
            xNSht.Name = CStr(xCol.Item(I))
        Else
            xNSht.Move , Sheets(Sheets.Count)
        End If
        xSht.Range("A" & xTRrow & ":A" & xRCount).EntireRow.Copy xNSht.Range("A1")
        xNSht.Columns.AutoFit
    Next
    xSht.AutoFilterMode = False
    xSht.Activate
    Application.ScreenUpdating = xSUpdate
End Sub
Sub MoveDataIntoCorrectPlaces()
'
' MoveDataIntoCorrectPlaces Macro
'

'
    Dim xsheet As Worksheet
    For Each xsheet In ThisWorkbook.Worksheets
        xsheet.Select
        Rows("3:3").Select
        Selection.Cut
        Rows("10:10").Select
        ActiveSheet.Paste
        Range("F2:G2").Select
        Selection.Cut
        Range("G2").Select
        Application.CutCopyMode = False
        Selection.Cut
        Range("F3").Select
        ActiveSheet.Paste
        Range("H2").Select
        Selection.Cut
        Range("F4").Select
        ActiveSheet.Paste
        Range("G10").Select
        Selection.Cut
        Range("F11").Select
        ActiveSheet.Paste
        Range("H10").Select
        Selection.Cut
        Range("F12").Select
        ActiveSheet.Paste
        Range("I10").Select
        Selection.Cut
        Range("F13").Select
        ActiveSheet.Paste
        Range("J10").Select
        Selection.Cut
        Range("F14").Select
        ActiveSheet.Paste

        Columns("F:F").Select
        Selection.Insert Shift:=xlToRight, CopyOrigin:=xlFormatFromLeftOrAbove

        Range("G1").Select
        Selection.Copy
        Range("F2").Select
        ActiveSheet.Paste
        Range("G1").Select
        Selection.Cut
        Range("F10").Select
        ActiveSheet.Paste
        Range("H1").Select
        Selection.Copy
        Range("F3").Select
        ActiveSheet.Paste
        Range("H1").Select
        Selection.Cut
        Range("F11").Select
        ActiveSheet.Paste
        Range("I1").Select
        Selection.Copy
        Range("F4").Select
        ActiveSheet.Paste
        Range("I1").Select
        Selection.Cut
        Range("F12").Select
        ActiveSheet.Paste
        Range("J1").Select
        Selection.Cut
        Range("F13").Select
        ActiveSheet.Paste
        Range("K1").Select
        Selection.Cut
        Range("F14").Select
        ActiveSheet.Paste

        Cells.Select
        Selection.ColumnWidth = 5
        Range("G2").Select
        Selection.TextToColumns _
          Destination:=Range("G2"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G3").Select
        Selection.TextToColumns _
          Destination:=Range("G3"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G4").Select
        Selection.TextToColumns _
          Destination:=Range("G4"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G10").Select
        Selection.TextToColumns _
          Destination:=Range("G10"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G11").Select
        Selection.TextToColumns _
          Destination:=Range("G11"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G12").Select
        Selection.TextToColumns _
          Destination:=Range("G12"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G13").Select
        Selection.TextToColumns _
          Destination:=Range("G13"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Range("G14").Select
        Selection.TextToColumns _
          Destination:=Range("G14"), _
          DataType:=xlDelimited, _
          TextQualifier:=xlDoubleQuote, _
          ConsecutiveDelimiter:=False, _
          Tab:=True, _
          Semicolon:=False, _
          Comma:=False, _
          Space:=False, _
          Other:=True, _
          OtherChar:=","
        Next xsheet
End Sub
