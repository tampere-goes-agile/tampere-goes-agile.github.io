#!/bin/bash

mkdir circles

   for PHOTO in *.jpg *.png
   do
       BASE="$(basename $PHOTO)"
	   echo "Converting $BASE"
	   convert -size 200x200 xc:none -fill "$PHOTO" -draw "circle 100,100 100,1" "circles/$BASE-circle2.png"
   done
   