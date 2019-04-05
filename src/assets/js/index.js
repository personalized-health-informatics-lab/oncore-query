import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-table/dist/bootstrap-table.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/index.css';

(() => {
  const table = $('#result-tb');

  function postData() {
    const content = $('#search-input').val();
    $.post('index', { content })
      .done((data) => {
        if (data) {
          table.bootstrapTable('destroy');
          table.bootstrapTable({
            pagination: true,
            showHeader: true,
            columns: [
              { field: 'protocolNumber', title: 'Protocol Number' },
              { field: 'title', title: 'Title' },
              { field: 'status', title: 'Status' },
              { field: 'phase', title: 'Phase' },
              { field: 'treatmentType', title: 'Treatment Type' },
              { field: 'summaryReportType', title: 'Summary Report Type' },
              { field: 'comment', title: 'Comments' },
            ],
            data: data.map(d => ({
              protocolNumber: d.PROTOCOL_NO,
              title: d.TITLE,
              status: d.STATUS,
              phase: d.PHASE,
              treatmentType: d.TREATMENT_TYPE,
              summaryReportType: d.SUMMARY4_REPORT_TYPE,
              comment: d.COMMENTS,
            })),
          });
        }
      })
      .fail();
  }

  $('#search-btn').on('click', () => {
    postData();
  });
  $('#search-input').on('keyup', (e) => {
    if (e.keyCode === 13) {
      postData();
    }
  });
})();
