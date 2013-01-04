<?php

foreach($_REQUEST as $var => $value)
{
	$fh = fopen("datos_out.json", 'w')
          or die("Error l'obrir el fitxer");
    $dadesJSON = $value;
	fwrite($fh, $dadesJSON) or die ("Error escribint al fitxer");
	echo "Registres guardats";
}

fclose($fh);

?>