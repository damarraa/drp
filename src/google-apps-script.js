// Google Apps Script code untuk menangani form data produksi
// Copy kode ini ke Google Apps Script project Anda

function doPost(request) {
  try {
    // Dapatkan spreadsheet aktif
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse data form dari request
    const formData = JSON.parse(request.postData.contents);
    
    // Dapatkan timestamp saat ini
    const timestamp = new Date();
    
    // Cek apakah header sudah ada, jika belum buat header
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'TGL/SHIFT/OP',
        'Tanggal',
        'Shift', 
        'Operator',
        // Hasil Produksi (kg)
        'Cap Medium',
        'Cap Small',
        'Plug Medium', 
        'Plug Small',
        'Assembling Medium',
        'Assembling Small',
        // Pemakaian Material (kg)
        'Usage PP',
        'Usage HDPE',
        'Usage MB',
        'Usage LDPE',
        // Bon (kg)
        'Bon PP',
        'Bon HDPE', 
        'Bon MB',
        'Bon LDPE',
        // Material Hilang (kg)
        'Bekuan',
        'Sapuan',
        'Move Steelmill'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    // Buat format TGL/SHIFT/OP
    const tglShiftOp = `${formData.date}/${formData.shift}/${formData.operator}`;
    
    // Siapkan data baris
    const rowData = [
      timestamp,
      tglShiftOp,
      formData.date || '',
      formData.shift || '',
      formData.operator || '',
      // Hasil Produksi
      parseFloat(formData.capMedium) || 0,
      parseFloat(formData.capSmall) || 0,
      parseFloat(formData.plugMedium) || 0,
      parseFloat(formData.plugSmall) || 0,
      parseFloat(formData.assemblingMedium) || 0,
      parseFloat(formData.assemblingSmall) || 0,
      // Pemakaian Material
      parseFloat(formData.usagePP) || 0,
      parseFloat(formData.usageHDPE) || 0,
      parseFloat(formData.usageMB) || 0,
      parseFloat(formData.usageLDPE) || 0,
      // Bon
      parseFloat(formData.bonPP) || 0,
      parseFloat(formData.bonHDPE) || 0,
      parseFloat(formData.bonMB) || 0,
      parseFloat(formData.bonLDPE) || 0,
      // Material Hilang
      parseFloat(formData.bekuan) || 0,
      parseFloat(formData.sapuan) || 0,
      parseFloat(formData.moveSteelmill) || 0
    ];
    
    // Tambahkan data ke sheet
    sheet.appendRow(rowData);
    
    // Auto-resize kolom untuk visibilitas yang lebih baik
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return response sukses
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data produksi berhasil disimpan'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return response error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Error memproses data: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight OPTIONS requests untuk CORS
function doGet(request) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script berjalan dengan baik'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}