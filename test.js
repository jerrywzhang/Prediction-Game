    function makeApiCall() {
        //https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
        var params = {
            spreadsheetId: '1vmuxBe87CYEvCgEPiumgQnf50oJpHK604JmMIQ_ksIQ',
            range: 'Data',
            valueInputOption: 'RAW',
            insertDataOption: 'RAW',
        };

        var valueRangeBody = {
            // TODO: Add desired properties to the request body.
        };

        var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function(response) {
            // TODO: Change code below to process the `response` object:
            console.log(response.result);
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
    }

    function initClient() {
        var API_KEY = 'AIzaSyDO24V2z6dTRoWmYbxv3XRs_vzHQOxd5y4';

        var CLIENT_ID = '903146104094-78lv2pushi3i0g7rrk1f6rom9t3mp726.apps.googleusercontent.com';

        // TODO: Authorize using one of the following scopes:
        //   'https://www.googleapis.com/auth/drive'
        //   'https://www.googleapis.com/auth/drive.file'
        //   'https://www.googleapis.com/auth/spreadsheets'
        var SCOPE = 'https://www.googleapis.com/auth/drive';

        gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPE,
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        }).then(function() {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function updateSignInStatus(isSignedIn) {
        if (isSignedIn) {
            makeApiCall();
        }
    }

    function handleSignInClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignOutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
