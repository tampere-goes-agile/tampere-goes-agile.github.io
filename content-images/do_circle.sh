#!/bin/bash

mkdir circles

   for PHOTO in faces/*.jpg faces/*.png
   do
       BASE="$(basename $PHOTO)"
	   echo "Converting $BASE"
	   convert -size 200x200 xc:none -fill "$PHOTO" -draw "circle 100,100 100,1" "circles/$BASE-circle.png"
	   #convert "$PHOTO" \( +clone -threshold -1 -negate -fill white -draw "circle `identify -format %w "$PHOTO" | awk '{print $1/2}'`, `identify -format %h "$PHOTO" | awk '{print $1/2}'` `identify -format %w "$PHOTO" | awk '{print $1/2}'`, 0" \) -alpha Off -compose copy_opacity -composite -colorspace sRGB "circles/$BASE-circle.png"
	   #convert "$PHOTO" -alpha set +clone -distort DePolar 0 -virtual-pixel HorizontalTile -background None -distort Polar 0 -compose Dst_In -composite -trim +repage "circles/$BASE-circle.png"
   done
   