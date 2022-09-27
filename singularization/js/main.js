
(function () {

    // Get Action Button
    let actionButton = document.getElementById('singularize');

    // Add Event Listener to Button
    actionButton.addEventListener('click', singularize);

    window.addEventListener('keyup', function (e) {
        if (e.key == 'Enter') {
            singularize();
        }
    })

})();


function singularize() {

    // Get Input Field
    let noun = document.querySelector('[name=noun]').value;

    let lastConsonant = '';
    let secondLastConsonant = '';
    let singular = '';
    let thirdCharFromLast = '';
    let remain = '';
    let substitutable = '';
    let substitute = '';

    // Change to singular
    // Get last Vowel
    let lastVowel = noun.slice(-1);

    // Pass through a switch
    // make variations depending on the rule that applies to specific last 2 charatcers
    let path = '';
    switch (lastVowel) {
        /**
         * Sukun
         */
        case 'ް':
            path = 'Sukun';

            // get last consonant (second last character)
            lastConsonant = noun.slice(-2, -1);

            if (lastConsonant == 'އ') { /** Alifu **/
                path = 'Alifu->'.concat(path);
                // Replace Last Alifu Sukun -> Kaafu EbeFili + Alif Sukun
                singular = noun.slice(0, -2).concat('ކެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ކެއް';
            }

            else if (lastConsonant == 'ސ') { /** Seenu **/
                path = 'Seenu->'.concat(path);
                // Replace Last Seenu Sukun -> Haa EbeFili, then add Alif Sukun
                singular = noun.slice(0, -2).concat('ހެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ހެއް';
            }

            else if (lastConsonant == 'ނ' || /** Noonu **/
                lastConsonant == 'ތ' || /** Thaa **/
                lastConsonant == 'ށ') { /** Shaviyani **/

                path = 'Noonu->'.concat(path);
                if (lastConsonant == 'ނ') { /** Noonu && **/
                    // get second last Consonant
                    secondLastConsonant = noun.slice(-4, -3);
                    if (secondLastConsonant == 'ނ' || // Noonu
                        secondLastConsonant == 'ލ' || // Laamu
                        secondLastConsonant == 'ގ' || // Gaafu
                        secondLastConsonant == 'ހ' || // Haa
                        secondLastConsonant == 'ބ') { // Baa
                        path = 'GeFahathah->'.concat(path);
                        path = 'Noonu'.concat(path);
                        path = 'Laamu/'.concat(path);
                        path = 'Gaafu/'.concat(path);
                        path = 'Haa/'.concat(path);
                        path = 'Baa/'.concat(path);
                        // Replace Last Noonu/Laamu/Haa Sukun -> Meemu EbeFili, then add Alif Sukun
                        singular = noun.slice(0, -2).concat('މެއް');

                        remain = noun.slice(0, -2);
                        substitutable = noun.slice(-2);
                        substitute = 'މެއް';
                        break;
                    }
                }

                // Noonu/Thaa/Shaviyani
                path = 'Thaa/'.concat(path);
                path = 'Shaviyani/'.concat(path);
                // Replace Last Sukun -> EbeFili, then add Alif Sukun
                singular = noun.slice(0, -1).concat('ެއް');

                remain = noun.slice(0, -1);
                substitutable = noun.slice(-1);
                substitute = 'ެއް';

            }

            else {
                path = 'Aanmu->'.concat(path);
                singular = noun.slice(0, -1).concat('ެއް');

                remain = noun.slice(0, -1);
                substitutable = noun.slice(-1);
                substitute = 'ެއް';
            }

            break;
        // End Sukun

        /**
         * Ubufili
         */
        case 'ު':
            path = 'UbuFili';


            // AubauFili
            // get last consonant (second last character)
            // get second last vowel (thrid last character)
            lastConsonant = noun.slice(-2, -1);
            secondLastVowel = noun.slice(-3, -2);
            if (lastConsonant == 'އ' && secondLastVowel == 'ަ') {
                path = 'Alif->'.concat(path);
                path = 'AbafileeGeFahathah->'.concat(path);
                path = '(AuBauFili)->'.concat(path);
                // Replace Last Alif UbuFili -> Laamu EbeFili, then add Alif Sukun
                singular = noun.slice(0, -2).concat('ލެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ލެއް';
            }
            else {
                // Replace Last UbuFili -> EbeFili, then add Alif Sukun
                singular = noun.slice(0, -1).concat('ެއް');

                remain = noun.slice(0, -1);
                substitutable = noun.slice(-1);
                substitute = 'ެއް';
            }
            break;

        /**
         * Ibifili
         */
        case 'ި':
            path = 'Ibifili';

            // get last consonant (second last character)
            lastConsonant = noun.slice(-2, -1);

            // Alif
            if (lastConsonant == 'އ') {
                path = 'Alif->'.concat(path);
                // Replace Last Alif Ibifili -> Yaa EbeFili, then add Alif Sukun
                singular = noun.slice(0, -2).concat('ޔެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ޔެއް';

            }

            // Noonu
            else if (lastConsonant == 'ނ') {
                path = 'Noonu->'.concat(path);
                // Replace Last Ibifili -> Sukun, then add Yaa Ebefili + Alif Sukun
                singular = noun.slice(0, -1).concat('ްޏެއް');

                remain = noun.slice(0, -1);
                substitutable = noun.slice(-1);
                substitute = 'ްޏެއް';

            }

            // Thaa
            else if (lastConsonant == 'ތ') {
                path = 'Thaa->'.concat(path);
                // get second last Vowel
                secondLastVowel = noun.slice(-3, -2);
                if (secondLastVowel == 'ް') { // Sukun
                    path = 'SukunGeFahathah->'.concat(path);
                    // Add Alif Ebefili + Alif Sukun
                    singular = noun.concat('އެއް');

                    remain = noun;
                    substitutable = '';
                    substitute = 'އެއް';
                }
                else {
                    // Replace Last Thaa Ibifili -> Alif Sukun + Chaviyani Ebefili + Alif Sukun
                    singular = noun.slice(0, -2).concat('އްޗެއް');

                    remain = noun.slice(0, -2);
                    substitutable = noun.slice(-2);
                    substitute = 'އްޗެއް';
                }

            }

            // Shaviyani
            else if (lastConsonant == 'ށ') {
                path = 'Shaviyani->'.concat(path);
                // Replace Last Shaviyani Ibifili -> Alif Sukun + Taviyani Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('އްޓެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'އްޓެއް';

            }

            // Laamu
            else if (lastConsonant == 'ލ') {
                path = 'Laamu->'.concat(path);
                // Replace Last Laamu Ibifili -> Alif Sukun + Yaa Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('އްޔެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'އްޔެއް';

            }

            // Haa
            else if (lastConsonant == 'ހ') {
                path = 'Haa->'.concat(path);
                // Replace Last Haa Ibifili -> Alif Sukun + Seenu Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('އްސެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'އްސެއް';

            }

            // Kaafu
            else if (lastConsonant == 'ކ') {
                path = 'Kaafu->'.concat(path);
                // Replace Last Kaafu Ibifili -> Thaa Sukun + Seenu Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('ތްކެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ތްކެއް';

            }

            // Vaavu
            else if (lastConsonant == 'ވ') {
                path = 'Vaavu->'.concat(path);
                // Replace Last Vaanu Ibifili -> Thaa Sukun + Vaavu Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('ތްވެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ތްވެއް';

            }

            // Faafu
            else if (lastConsonant == 'ފ') {
                path = 'Faafu->'.concat(path);
                // Replace Last Faafu Ibifili -> Thaa Sukun + Paviyani Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('ތްޕެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ތްޕެއް';

            }

            // Dhaalu
            else if (lastConsonant == 'ދ') {
                path = 'Dhaalu->'.concat(path);
                thirdCharFromLast = noun.slice(-3, -2);
                if (thirdCharFromLast == 'ނ') { // HusNoonu
                    path = 'HusNoonuGeFahathah->'.concat(path);
                    // Replace Last Dhaalu Ibifili -> Sukun + Javiyani Ebefili + Alif Sukun
                    singular = noun.slice(0, -2).concat('ްޖެއް');

                    remain = noun.slice(0, -2);
                    substitutable = noun.slice(-2);
                    substitute = 'ްޖެއް';
                }
                else {
                    // Replace Last Dhaalu Ibifili -> Alif Sukun + Javiyani Ebefili + Alif Sukun
                    singular = noun.slice(0, -2).concat('އްޖެއް');

                    remain = noun.slice(0, -2);
                    substitutable = noun.slice(-2);
                    substitute = 'އްޖެއް';
                }

            }

            // Baa
            else if (lastConsonant == 'ބ') {
                path = 'Baa->'.concat(path);
                // Replace Last Baa Ibifili -> Thaa Sukun + Baa Ebefili + Alif Sukun
                singular = noun.slice(0, -2).concat('ތްބެއް');

                remain = noun.slice(0, -2);
                substitutable = noun.slice(-2);
                substitute = 'ތްބެއް';

            }

            else {
                path = 'Aanmu->'.concat(path);
                singular = noun.concat('ޔެއް');

                remain = noun;
                substitutable = '';
                substitute = 'ޔެއް';
            }
            break;
        // End Ibifili

        /**
         * Ooboofili
         */
        case 'ޫ':
            path = 'Ooboofili';
            singular = noun.slice(0, -1).concat('ުލެއް');

            remain = noun.slice(0, -1);
            substitutable = noun.slice(-1);
            substitute = 'ުލެއް';
            break;

        /**
         * AabaaFili
         */
        case 'ާ':
            path = 'AabaaFili';

            lastConsonant = noun.slice(-2, -1);
            // If on haa
            if (lastConsonant == 'ހ') {
                path = 'Haa->'.concat(path);
                secondLastConsonant = noun.slice(-3, -2);
                // If Word Has No Other Letters
                if (!secondLastConsonant) {
                    path = 'HamaEkani->'.concat(path);
                    singular = noun.concat('ލެއް');

                    remain = noun;
                    substitutable = '';
                    substitute = 'ލެއް';
                } else {
                    singular = noun.slice(0, -1).concat('ެއް');

                    remain = noun.slice(0, -1);
                    substitutable = noun.slice(-1);
                    substitute = 'ެއް';
                }
            } else {
                path = 'Aanmu->'.concat(path);
                singular = noun.slice(0, -1).concat('ަލެއް');

                remain = noun.slice(0, -1);
                substitutable = noun.slice(-1);
                substitute = 'ަލެއް';
            }
            break;

        default:
            path = 'Aanmu';
            singular = noun.concat('އެއް');

            remain = noun;
            substitutable = '';
            substitute = 'އެއް';
    }

    // Add singular to page
    document.getElementById('singular').innerHTML = path.concat('<br><span dir=rtl>', singular, '</span>');

    // Add To Animation HTML
    document.querySelector('.remain').innerHTML = remain;
    document.querySelector('.substitutable').innerHTML = substitutable;
    document.querySelector('.substitute').innerHTML = substitute;

}