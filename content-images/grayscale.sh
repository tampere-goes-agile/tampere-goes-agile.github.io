#!/bin/bash
   for PHOTO in circles/*.png
   do
       BASE="$(basename $PHOTO)"
	   PERSON="${BASE%-*}"
	   echo "Converting $BASE to bw/${PERSON}.png"
	   convert "$PHOTO" -colorspace RGB -colorspace gray -modulate 100,0 -colorspace sRGB "bw/${PERSON}.png"
	   #convert "$PHOTO" -channel RGBA -matte -colorspace gray "circles/${PERSON}-2.png"
   done
   