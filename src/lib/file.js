
const File = {

  link: function(file) {
    const root = location.hostname == 'agilesimulations.co.uk' ? '/maykind' : ''
    return root + '/img/' + file
  }
}

export default File
