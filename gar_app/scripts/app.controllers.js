app.controller('bomHomeController', ['$scope', 'dataService', function($scope, dataService) {

    $scope.colorSizes = { styleNo: '', colors: [], sizeRows: [] };
    $scope.sizes = []; // This is just to show the list, this should be done in a proper way
    $scope.fabrics = [];
    $scope.trims = [];
    $scope.packing = [];
    $scope.gridOptions = {};


    var addColorFn = function(colorObj) {
        $scope.colorSizes.colors.push(colorObj);
        if ($scope.colorSizes.sizeRows.length > 0) {
            // add data for all sizes
        }
    };
    var removeColorFn = function(colorObj) {

    };
    var addSizeFn = function(sizeObj) {
        $scope.colorSizes.sizeRows.push(sizeObj);
        $scope.sizes.push({ label: sizeObj.label });
        if ($scope.colorSizes.colors.length > 0) {
            // add data for all colors
        }
    };
    var removeSizeFn = function(sizeObj) {

    };
    $scope.sizeAdded = function(e) {
        if (e.target.value) {
            var amountsArray = [];
            for (var i = 0; i < $scope.colorSizes.colors.length; i++) {
                amountsArray.push({ unitPrice: '', quantity: '' });
            }
            addSizeFn({ label: e.target.value, amounts: amountsArray });

            //$scope.colorSizes.sizeRows.push(e.target.value);
            e.target.value = '';
        }
    };
    $scope.sizeEdited = function() {

    };
    $scope.getTotalQuantity = function() {
        var total = 0;
        for (var i = 0; i < $scope.colorSizes.sizeRows.length; i++) {
            var sizeRow = $scope.colorSizes.sizeRows[i];
            for (var j = 0; j < sizeRow.amounts.length; j++) {
                amountItm = sizeRow.amounts[j];
                var qty = parseInt(amountItm.quantity) || 0;
                if (qty > 0) {
                    total += qty;
                }
            }

        }
        return total;
    };
    $scope.getTotalNetAmount = function() {
        var total = 0;
        for (var i = 0; i < $scope.colorSizes.sizeRows.length; i++) {
            var sizeRow = $scope.colorSizes.sizeRows[i];
            for (var j = 0; j < sizeRow.amounts.length; j++) {
                amountItm = sizeRow.amounts[j];
                var qty = parseInt(amountItm.quantity) || 0;
                var unitPrice = parseInt(amountItm.unitPrice) || 0;
                if (qty > 0 && unitPrice) {
                    total += (qty * unitPrice);
                }
            }

        }
        return total;
    };
    $scope.getSuplierName = function(rowEntity) {
        for (var i = 0; i < $scope.supliers.length; i++) {
            if ($scope.supliers[i].id === rowEntity.Supplier_Name) {
                return $scope.supliers[i].name;
            }
        }
        return '';
    };
    $scope.getMaterialName = function(rowEntity) {
        for (var i = 0; i < $scope.materials.length; i++) {
            if ($scope.materials[i].id === rowEntity.Application) {
                return $scope.materials[i].application;
            }
        }
        return '';
    };
    var intiFn = function() {
        $scope.fabrics.push({ Application: 0, Supplier_Name: 0, Product_description: '', Finished_Width: '', Cuttable_width: '', Color: '', Net_cons: 0, Wastage: 0, Gross_cons: 0, Qty: 0, UOM: '', Price: '', Remarks: '' });
        $scope.gridOptions.data = $scope.fabrics;
        //$scope.trims = [];
        //$scope.packing = [];
    };
    var getBuyers = function() {
        dataService.getBuyers({}, function(d) {
                console.log(d)
                $scope.buyers = d;

                $scope.selectedBuyer = [];
                $scope.ddBuyersSettings = {
                    scrollableHeight: '200px',
                    scrollable: true,
                    enableSearch: true,
                    showCheckAll: false,
                    showUncheckAll: false,
                    selectionLimit: 1,
                    closeOnSelect: true,
                    checkBoxes: false,
                    smartButtonMaxItems: 3,
                    smartButtonTextConverter: function(itemText, originalItem) { return itemText; }
                };
            },
            function(e) {
                handleNetworkError(e);
            });
    };
    var getColors = function() {
        dataService.getColors(function(d) {
                console.log(d)

                $scope.selectedColors = [];
                $scope.ddColorsSettings = {
                    scrollableHeight: '200px',
                    scrollable: true,
                    enableSearch: true,
                    showCheckAll: false,
                    showUncheckAll: false
                };
                $scope.ddColorsEvents = {
                    onItemSelect: function(colorObj) {
                        addColorFn(colorObj)
                    },
                    onItemDeselect: function(colorObj) {
                        console.log(colorObj);
                    }
                };
                $scope.colors = d;
            },
            function(e) {
                handleNetworkError(e);
            });
    };
    var getMaterials = function() {
        dataService.getMaterials(function(d) {
                console.log(d)
                $scope.materials = d;
            },
            function(e) {
                //handleNetworkError(e);
            });
    };
    var getSupliers = function() {
        dataService.getSupliers(function(d) {
                console.log(d)
                $scope.supliers = d;
            },
            function(e) {
                //handleNetworkError(e);
            });
    };
    getBuyers();
    getColors();
    getMaterials();
    getSupliers();
    intiFn();
    var handleNetworkError = function(e) {
        alert('error ' + e);
    };

    // -------------------------- BOM ------------------------------------------
    $scope.bom = {
        Initiate_date: new Date(),
        Revision_No: '',
        Revised_date: '',
        Description: ' JOELY BRA',
        Season: '',
        PCD: new Date(),
        Delivery: new Date(),
        Qty: 6000,
        Splits: []
    };
    $scope.splitAdded = function(e) {
        if (e.target.value) {
            var splitSizeList = [];
            for (var i = 0; i < $scope.sizes.length; i++) {
                splitSizeList.push({ label: $scope.sizes[i].label, value: false });
            }
            $scope.bom.Splits.push({ label: e.target.value, splitSizes: [], split_sizes: splitSizeList });

            //$scope.colorSizes.sizeRows.push(e.target.value);
            e.target.value = '';
        }
    };


    $scope.gridOptions.columnDefs = [
        { name: 'Application', displayName: 'Application', editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'application', width: '15%', editDropdownOptionsArray: $scope.materials, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getMaterialName(row.entity)}}</div>' },
        { name: 'Supplier_Name', displayName: 'Supplier Name', editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'name', width: '15%', editDropdownOptionsArray: $scope.supliers, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getSuplierName(row.entity)}}</div>' },
        { name: 'Product_description', displayName: 'Product description', width: '15%' },
        { name: 'Finished_Width', displayName: 'Finished Width', width: '15%' },
        { name: 'Cuttable_width', displayName: 'Cuttable width', width: '15%' },
        { name: 'Color', displayName: 'Color', width: '8%' },
        { name: 'Net_cons', displayName: 'Net Cons.', width: '8%' },
        { name: 'Wastage', displayName: 'Wastage', width: '8%' },
        { name: 'Gross_cons', displayName: 'Gross Cons.', width: '8%' },
        { name: 'Qty', displayName: 'Qty', width: '8%' },
        { name: 'Price', displayName: 'Price', width: '8%' },
        { name: 'Remarks', displayName: 'Remarks', width: '15%' }
    ];

    // -------------------------- BOM-End --------------------------------------
}]);

app.controller('dashHomeController', ['$scope', function($scope) {

}]);