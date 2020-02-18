app.service('dataService', ['$http', function($http) {

    var getBuyersFn = function(params, success, fail) {

        /*var req = {
            method: 'GET',
            url: '/mock_srv/get-buyers',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        $http(req).then(function(result) {
                success(result);
            },
            function(e) {
                fail(e);
            });*/
        buyers = []
        buyers.push({ id: 1034, label: 'ABC Ltd' })
        buyers.push({ id: 1035, label: 'Seelabs Ltd' })
        buyers.push({ id: 1036, label: 'Lackport Ltd' })
        buyers.push({ id: 1037, label: 'Abecus Ltd' })
        buyers.push({ id: 1038, label: 'Absocis Ltd' })
        buyers.push({ id: 1039, label: 'Abcrole Ltd' })
        buyers.push({ id: 1040, label: 'Abluces Ltd' })
        buyers.push({ id: 1041, label: 'ABCDE Ltd' })
        buyers.push({ id: 1042, label: 'Seelabsnic Ltd' })
        buyers.push({ id: 1043, label: 'Lackpo Ltd' })
        buyers.push({ id: 1044, label: 'Abecusmin Ltd' })
        buyers.push({ id: 1045, label: 'Absocisla Ltd' })
        buyers.push({ id: 1046, label: 'Abcrolest Ltd' })
        buyers.push({ id: 1047, label: 'Ablucesper Ltd' })
        success(buyers)
    };

    var getColorsFn = function(success, fail) {
        colors = []
        colors.push({ 'id': 14, "label": 'Gray' })
        colors.push({ 'id': 15, "label": 'White' })
        colors.push({ 'id': 16, "label": 'Pink' })
        colors.push({ 'id': 17, "label": 'Blue' })
        colors.push({ 'id': 18, "label": 'Yello' })
        colors.push({ 'id': 19, "label": 'Red' })
        success(colors)
    };
    var getMaterialsFn = function(success, fail) {
        maetrials = [];
        maetrials.push({ id: 1, type: 'fab_lace', application: 'GALOON LACE - TOP CUP / CB', productDes: 'Lace - 1321-19' });
        maetrials.push({ id: 2, type: 'fab_lace', application: 'BOTTOM CUP / SIDE WING / CF/ WING double  LAYER', productDes: 'NAE00834' });
        maetrials.push({ id: 3, type: 'fab_lace', application: 'POCKET / BINDING', productDes: '100% COTTON FABRIC' });
        maetrials.push({ id: 4, type: 'fab_lace', application: 'INNER CUP/ Center Front /Credele', productDes: 'STABILIZER' });

        maetrials.push({ id: 5, type: 'fab_lace_binding', application: 'Side Seam - 20mm', productDes: '100% COTTON FABRIC' });
        maetrials.push({ id: 6, type: 'fab_lace_binding', application: 'Around Cup - 20mm', productDes: '100% COTTON FABRIC' });

        maetrials.push({ id: 7, type: 'trims', application: 'UNDER BAND ELASTIC', productDes: '1680811/18' });
        maetrials.push({ id: 9, type: 'trims', application: 'UNDER ARM ELASTIC', productDes: '1680811/8' });
        maetrials.push({ id: 10, type: 'trims', application: 'PAPER ELASTIC -Neck Edge/ Pocket Opening', productDes: 'L53055' });

        maetrials.push({ id: 11, type: 'trims', application: 'STRAP ELASTIC', productDes: 'SF1680004' });
        maetrials.push({ id: 12, type: 'trims', application: 'STRAP', productDes: 'KARDNEE' });
        maetrials.push({ id: 13, type: 'trims', application: 'CB', productDes: 'TEXCO' });

        maetrials.push({ id: 14, type: 'thread', application: 'Thread', productDes: 'TKT 120' });
        maetrials.push({ id: 15, type: 'thread', application: 'Thread', productDes: 'TKT 160' });


        success(maetrials);
    };

    var getSupliersFn = function(success, fail) {
        supliers = [];
        supliers.push({ id: 1, name: 'JADE LACE - Turkey' });
        supliers.push({ id: 2, name: 'JADE LACE' });
        supliers.push({ id: 3, name: 'THINK TOP - china' });
        supliers.push({ id: 4, name: 'THINK TOP' });
        supliers.push({ id: 5, name: 'South Asia' });
        supliers.push({ id: 6, name: 'Thomas Kershaw' });
        supliers.push({ id: 7, name: 'PIONEER' });
        supliers.push({ id: 8, name: 'Tack Fast' });
        supliers.push({ id: 9, name: 'NYLON COATED RING' });
        supliers.push({ id: 10, name: 'HOOK AND EYE' });
        supliers.push({ id: 11, name: 'Naturab' });
        supliers.push({ id: 12, name: 'Trident' });
        supliers.push({ id: 13, name: 'MANY TO ONE' });
        supliers.push({ id: 14, name: 'Rapid' });
        success(supliers)
    };

    return {
        getBuyers: getBuyersFn,
        getColors: getColorsFn,
        getMaterials: getMaterialsFn,
        getSupliers: getSupliersFn
    };
}]);