// Code Google Apps Script à copier dans votre projet Google Apps Script
// Ce script recevra les données du formulaire et les enregistrera dans Google Sheets

// L'ID de votre Google Sheet (récupérez-le dans l'URL de votre feuille)
const SHEET_ID = '1eN0J2swJg10KcbbFIrr9qsejWe-tykI1Y4ggHOWzSrM';
const SHEET_NAME = 'Réponses RSVP';

// Fonction principale qui reçoit les données POST
function doPost(e) {
  try {
    // Récupérer les données envoyées
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir la feuille Google Sheets
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Si la feuille n'existe pas, la créer avec les en-têtes
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Date/Heure',
        'Nom',
        'Prénom',
        'Présence',
        'Nombre d\'adultes',
        'Nombre d\'enfants'
      ]);
      
      // Formater la ligne d'en-tête
      const headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#6b8e6f');
      headerRange.setFontColor('#ffffff');
    }
    
    // Ajouter les données dans une nouvelle ligne
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('fr-FR'),
      data.nom || '',
      data.prenom || '',
      data.presence || '',
      data.adultes || '',
      data.enfants || ''
    ]);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'data': data }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En cas d'erreur, la logger et retourner une erreur
    Logger.log('Erreur: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction pour tester le script (GET request)
function doGet(e) {
  return ContentService.createTextOutput('Le script RSVP Bar Mitsvah fonctionne correctement!');
}

