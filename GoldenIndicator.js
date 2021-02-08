//@version=4


study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

// MA#Period is a variable used to store the indicator lookback period.  In this case, from the input.
// input - https://www.tradingview.com/pine-script-docs/en/v4/annotations/Script_inputs.html
MA1Period = input(6, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)
MA1Visible = input(title="MA1 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA2Period = input(21, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)
MA2Visible = input(title="MA2 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA3Period = input(150, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)
MA3Visible = input(title="MA3 Visible", type=input.bool, defval=false) // Will automatically hide crossovers containing this MA
ShowCrosses = input(title="Show Labels", type=input.bool, defval=true)

// MA# is a variable used to store the actual moving average value.
// if statements - https://www.tradingview.com/pine-script-reference/#op_if
// MA functions - https://www.tradingview.com/pine-script-reference/ (must search for appropriate MA)
MA1 = if MA1Type == "SMA"
    sma(MA1Source, MA1Period)
else
    if MA1Type == "EMA"
        ema(MA1Source, MA1Period)
    else
        if MA1Type == "WMA"
            wma(MA1Source, MA1Period)
        else
            if MA1Type == "RMA"
                rma(MA1Source, MA1Period)
            else
                if MA1Type == "HMA"
                    wma(2*wma(MA1Source, MA1Period/2)-wma(MA1Source, MA1Period), round(sqrt(MA1Period)))
                else
                    if MA1Type == "DEMA"
                        e = ema(MA1Source, MA1Period)
                        2 * e - ema(e, MA1Period)
                    else
                        if MA1Type == "TEMA"
                            e = ema(MA1Source, MA1Period)
                            3 * (e - ema(e, MA1Period)) + ema(ema(e, MA1Period), MA1Period)

                    
MA2 = if MA2Type == "SMA"
    sma(MA2Source, MA2Period)
else
    if MA2Type == "EMA"
        ema(MA2Source, MA2Period)
    else
        if MA2Type == "WMA"
            wma(MA2Source, MA2Period)
        else
            if MA2Type == "RMA"
                rma(MA2Source, MA2Period)
            else
                if MA2Type == "HMA"
                    wma(2*wma(MA2Source, MA2Period/2)-wma(MA2Source, MA2Period), round(sqrt(MA2Period)))
                else
                    if MA2Type == "DEMA"
                        e = ema(MA2Source, MA2Period)
                        2 * e - ema(e, MA2Period)
                    else
                        if MA2Type == "TEMA"
                            e = ema(MA2Source, MA2Period)
                            3 * (e - ema(e, MA2Period)) + ema(ema(e, MA2Period), MA2Period)
                    
MA3 = if MA3Type == "SMA"
    sma(MA3Source, MA3Period)
else
    if MA3Type == "EMA"
        ema(MA3Source, MA3Period)
    else
        if MA3Type == "WMA"
            wma(MA3Source, MA3Period)
        else
            if MA3Type == "RMA"
                rma(MA3Source, MA3Period)
            else
                if MA3Type == "HMA"
                    wma(2*wma(MA3Source, MA3Period/2)-wma(MA3Source, MA3Period), round(sqrt(MA3Period)))
                else
                    if MA3Type == "DEMA"
                        e = ema(MA3Source, MA3Period)
                        2 * e - ema(e, MA3Period)
                    else
                        if MA3Type == "TEMA"
                            e = ema(MA3Source, MA3Period)
                            3 * (e - ema(e, MA3Period)) + ema(ema(e, MA3Period), MA3Period)

transparency = 95
breakLines= "\n\n\n\n\n"

// Plotting crossover/unders for all combinations of crosses
// https://www.tradingview.com/pine-script-reference/v4/#fun_label%7Bdot%7Dnew
if ShowCrosses and MA1Visible and MA2Visible and crossunder(MA1, MA2)
    lun1 = label.new(bar_index, na, "Short"+breakLines, 
      color=color.new(color.red, transparency), 
      textcolor=color.white,
      style=label.style_labeldown, size=size.tiny)
    label.set_y(lun1, MA1)
if ShowCrosses and MA1Visible and MA2Visible and crossover(MA1, MA2)
    lup1 = label.new(bar_index, na,  breakLines+"Long",
      color=color.new(color.green, transparency), 
      textcolor=color.white,
      style=label.style_labelup, size=size.tiny)
    label.set_y(lup1, MA1)
if ShowCrosses and MA1Visible and MA3Visible and crossunder(MA1, MA3)
    lun2 = label.new(bar_index, na,  "Short"+breakLines,
      color=color.new(color.red, transparency), 
      textcolor=color.white,
      style=label.style_labeldown, size=size.tiny)
    label.set_y(lun2, MA1)
if ShowCrosses and MA1Visible and MA3Visible and crossover(MA1, MA3)
    lup2 = label.new(bar_index, na,   breakLines+"Long",
      color=color.new(color.green, transparency), 
      textcolor=color.white,
      style=label.style_labelup, size=size.tiny)
    label.set_y(lup2, MA1)
if ShowCrosses and MA2Visible and MA3Visible and crossunder(MA2, MA3)
    lun3 = label.new(bar_index, na,  "Short"+breakLines,
      color=color.new(color.red, transparency), 
      textcolor=color.white,
      style=label.style_labeldown, size=size.tiny)
    label.set_y(lun3, MA2)
if ShowCrosses and MA2Visible and MA3Visible and crossover(MA2, MA3)
    lup3 = label.new(bar_index, na,   breakLines+"Long",
      color=color.new(color.green, transparency), 
      textcolor=color.white,
      style=label.style_labelup, size=size.tiny)
    label.set_y(lup3, MA2) 

plot(MA1,color = color.green , linewidth = 2)
plot(MA2,color = color.red , linewidth = 2)
plot(MA3,color = color.blue , linewidth = 2)
