export function tinymceInit() {
  tinymce.init({
    selector: '#textarea',
    height: '300px',
    //    theme : '' ,
    plugins:
      ' image emoticons wordcount  codesample anchor autolink link lists insertdatetime autolink lists  media  table ',
    toolbar:
      'undo redo image  emoticons wordcount bold italic blockquote link forecolor backcolor insertdatetime anchor codesample  numlist bullist addcomment showcomments code align ',
    // toolbar_mode: 'floating',
    images_upload_url: 'postAcceptor.php',
    automatic_uploads: false,
    contextmenu: '',
    // contextmenu: 'paste | link image inserttable | cell row column deletetable | inspect',

    relative_urls: true,
    default_link_target: '_blank',
    link_default_protocol: 'https',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    codesample_global_prismjs: true,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
    ],
  });

  //    tinymce.EditorManager.editors = [];
}

// this will fix routing problem when i route to another link
// as profile or home and return to create article again
// tinymce body become not editable
// and to fix this i will remove this editor and reinitalize it again .
export function removeAndReinitializeEditor() {
  tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'textarea');
  tinymce.EditorManager.execCommand('mceAddEditor', true, 'textarea');
  // tinyMCE.DOM.addClass('pre', 'line-numbers');
}
