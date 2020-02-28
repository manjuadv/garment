app.filter('calculatePercentage', function() {
    return function(input, netCons, wastagePre) {
        var netConInt = parseInt(input[netCons]);
        var wastagePreInt = parseInt(input[wastagePre]);
        console.log(netConInt);
        console.log(wastagePreInt);
        return Math.floor(netConInt + ((wastagePreInt * netConInt) / 100));
    };
});
app.controller('bomHomeController', ['$scope', 'dataService', 'uiGridConstants', function($scope, dataService, uiGridConstants) {

    $scope.colorSizes = { styleNo: '', colors: [], sizeRows: [] };
    $scope.sizes = []; // This is just to show the list, this should be done in a proper way
    $scope.fabrics = [];
    $scope.trims = [];
    $scope.packing = [];
    $scope.gridOptions = {};
    $scope.splitOptions = [];


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
    /*$scope.getMaterialNameGrouping = function(val) {
        var selID = val.split(' ')[0];
        console.log('m ' + selID);
        for (var i = 0; i < $scope.materials.length; i++) {
            console.log($scope.materials[i]);
            if ($scope.materials[i].id === selID) {
                return $scope.materials[i].application;
            }
        }
        return '';
    };*/
    $scope.getSplitTypeName = function(rowEntity) {
        for (var i = 0; i < $scope.splitOptions.length; i++) {
            if ($scope.splitOptions[i].id === rowEntity.SplitType) {
                return $scope.splitOptions[i].name;
            }
        }
        return '';
    };
    var intiFn = function() {
        //$scope.fabrics.push();

        $scope.splitOptions.push({ id: 1, name: 'Color' });
        $scope.splitOptions.push({ id: 2, name: 'Color & Size' });
        $scope.splitOptions.push({ id: 3, name: 'Size' });
        $scope.splitOptions.push({ id: 0, name: 'None' });
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

    var getEmptyMaterialRow = function() {
        return { Application: 0, Supplier_Name: 0, Product_description: '', Finished_Width: '', Cuttable_width: '', Color: '', Net_cons: 0, Wastage: 0, Gross_cons: 0, Qty: 0, UOM: '', Price: '', Remarks: '' };
    };

    $scope.addNewFabRow = function() {
        $scope.gridOptions.data.push(getEmptyMaterialRow());
    };
    $scope.addNewTrimsRow = function() {
        $scope.gridOptionsTrims.data.push(getEmptyMaterialRow());
    };

    $scope.gridOptions.columnDefs = [
        { name: 'Application', grouping: { groupPriority: 0 }, displayName: 'Application', editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'application', width: '15%', editDropdownOptionsArray: $scope.materials, cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null ||( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div> <div class="ui-grid-cell-contents">{{grid.appScope.getMaterialName(row.entity)}}</div>' },
        { name: 'Color', grouping: { groupPriority: 1 }, displayName: 'Color', width: '8%' },
        { name: 'Split', displayName: 'Split', width: '8%' },
        { name: 'Supplier_Name', displayName: 'Supplier Name', editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownValueLabel: 'name', width: '15%', editDropdownOptionsArray: $scope.supliers, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getSuplierName(row.entity)}}</div>' },
        { name: 'Product_description', displayName: 'Product description', width: '15%' },
        { name: 'Finished_Width', displayName: 'Finished Width', width: '15%' },
        { name: 'Cuttable_width', displayName: 'Cuttable width', width: '15%' },
        { name: 'Net_cons', field: 'Net_cons', displayName: 'Net Cons.', width: '8%' },
        { name: 'Wastage', field: 'Wastage', displayName: 'Wastage', width: '8%' },
        { name: 'Gross_cons', displayName: 'Gross Cons.', field: uiGridConstants.ENTITY_BINDING, cellFilter: 'calculatePercentage:"Net_cons":"Wastage"', sortCellFiltered: true, enableCellEdit: false, width: '8%' },
        { name: 'Qty', displayName: 'Qty', width: '8%' },
        { name: 'Price', displayName: 'Price', width: '8%' },
        {
            name: 'SplitType',
            displayName: 'Split Type',
            editableCellTemplate: 'ui-grid/dropdownEditor',
            width: '10%',
            editDropdownValueLabel: 'name',
            editDropdownOptionsArray: $scope.splitOptions,
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getSplitTypeName(row.entity)}}</div>'
        },
        { name: 'Remarks', displayName: 'Remarks', width: '15%' }
    ];
    $scope.treeRowHeaderAlwaysVisible = false;
    $scope.gridOptions.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        //$scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            if (colDef.name === 'SplitType') {
                console.log('new val ' + newValue);
                if (newValue === 1) { // Color
                    addSplit(1, 1, rowEntity);
                } else if (newValue === 2) { // Color & Size
                    addSplit(1, 2, rowEntity);
                } else if (newValue === 3) { // Size

                } else { // No Splits

                }
            }
        });
    };

    $scope.gridOptions.data = $scope.fabrics;
    $scope.gridOptionsTrims = angular.copy($scope.gridOptions);
    $scope.gridOptionsTrims.data = [];
    $scope.gridOptionsTrims.onRegisterApi = function(gridApi) {
        //set gridApi on scope
        //$scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            if (colDef.name === 'SplitType') {
                console.log('new val ' + newValue);
                if (newValue === 1) { // Color
                    addSplit(2, 1, rowEntity);
                } else if (newValue === 2) { // Color & Size
                    addSplit(2, 2, rowEntity);
                } else if (newValue === 3) { // Size

                } else { // No Splits

                }
            }
        });
    };

    var addSplit = function(gridId, type, rowEntity) {
        if (type === 1) {
            rowEntity.Color = $scope.selectedColors[0].label;
            for (var i = 1; i < $scope.selectedColors.length; i++) {
                newRec = angular.copy(rowEntity);
                newRec.Color = $scope.selectedColors[i].label;
                if (gridId === 1)
                    $scope.fabrics.push(newRec);
                else if (gridId === 2)
                    $scope.trims.push(newRec);
            }
        } else if (type === 2) { // Color & Size
            rowEntity.Color = $scope.selectedColors[0].label;
            rowEntity.Split = $scope.bom.Splits[0].label;
            for (var i = 0; i < $scope.selectedColors.length; i++) {
                for (var j = 0; j < $scope.bom.Splits.length; j++) {
                    if (i === 0 && j === 0)
                        continue; // just skip adding row for first record, it has been updated with relavent values in code before this line
                    newRec = angular.copy(rowEntity);
                    newRec.Color = $scope.selectedColors[i].label;
                    newRec.Split = $scope.bom.Splits[j].label;
                    if (gridId === 1)
                        $scope.fabrics.push(newRec);
                    else if (gridId === 2)
                        $scope.trims.push(newRec);
                }
            }
        } else if (type === 3) { // Size

        }
    };
    // -------------------------- BOM-End --------------------------------------

}]);

app.controller('dashHomeController', ['$scope', function($scope) {

}]);