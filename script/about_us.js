document.getElementById('copyButton').addEventListener('click', function() {
    var discordId = document.getElementById('discordId');
    discordId.select();
    document.execCommand('copy');
    alert('Identifiant Discord copié : ' + discordId.value);
  });
  