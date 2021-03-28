const cateChange = (value) => {
    var flag = true;
    $('.btn--main').removeClass('pointer-track');
    $('.sub-category')
        .find('option')
        .each(function (i, e) {
            if ($(e).attr('data-parent') == value) {
                $(e).show();
                if (flag) {
                    $('.sub-category').val($(e).val());
                    flag = false;
                    $('.sub-category').trigger('change');
                }
            } else {
                $(e).hide();
            }
        });
    if (flag) {
        $('.sub-category').val('');
        $('.btn--main').addClass('pointer-track');
        $('.sub-category').trigger('change');
    }
}

const subCateChange = (value) => {
    var flag = true;
    $('.btn--main').removeClass('pointer-track');
    $('.product-filter')
        .find('option')
        .each(function (i, e) {
            var arrays = $(e).attr('data-parent').split(',');
            if (arrays.includes(value)) {
                $(e).show();
                if (flag) {
                    $('.product-filter').val($(e).val());
                    flag = false;
                }
            } else {
                $(e).hide();
            }
        });
    if (flag) {
        $('.product-filter').val('');
        $('.btn--main').addClass('pointer-track');
    }
}