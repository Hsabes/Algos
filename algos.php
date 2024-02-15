<!-- 

Nikki’s Robot Nunchuk Dojo is building a pair of fighting robots for testing purposes and it needs AI software written in PHP. Here are the specs:

Robots have 100 hit points
A robot will attack the opposing robot with nunchucks until the opposing robot has 0 hit points. 
Each robot’s attack does between 1 and 125 damage points, which can be expressed with rand(1, 125)
Any attack above 99 is a critical hit
A robot’s HP should not fall below 0.

Write a loop so that a robot attacks as many times as it takes to deal at least 100 damage, keeping in mind that it has to attack at least once. Details of each attack should be documented, as well as a confirmation that the robot was eliminated. 

-->

<?php

$hp = 100;
function attack($hp){
    $noa = 0;
    $overkill = 0;
    do {
        $attack = rand( 1, 125 );
        $crit = $attack > 99 ? ' (Critical hit!)' : '';
        $noa++;
        if ($hp - $attack < 0){
            $overkill -= $hp - $attack;
            $hp = 0;
        } else {
            $hp -= $attack;
        }
        echo "Attack: $attack$crit ";
        echo "Remaining hp: $hp | ";
    } while ($hp > 0);
    echo "Robot eliminated! Total number of attacks: $noa (Overkill: $overkill)";
}

attack($hp);

?>

<!-- ======== -->

