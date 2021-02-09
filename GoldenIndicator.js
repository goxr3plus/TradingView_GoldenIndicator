//@version=4


study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

// MA#Period is a variable used to store the indicator lookback period.  In this case, from the input.
// input - https://www.tradingview.com/pine-script-docs/en/v4/annotations/Script_inputs.html
MA1Period = input(6, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)
MA1Visible = input(title="MA1 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA2Period = input(14, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)
MA2Visible = input(title="MA2 Visible", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA3Period = input(150, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)
MA3Visible = input(title="MA3 Visible", type=input.bool, defval=false) // Will automatically hide crossovers containing this MA
ShowCrosses = input(title="Show Labels", type=input.bool, defval=true)


getMA(type,source,period) =>
    if type == "SMA"
        sma(source, period)
    else
        if type == "EMA"
            ema(source, period)
        else
            if type == "WMA"
                wma(source, period)
            else
                if type == "RMA"
                    rma(source, period)
                else
                    if type == "HMA"
                        wma(2*wma(source, period/2)-wma(source, period), round(sqrt(period)))
                    else
                        if type == "DEMA"
                            e = ema(source, period)
                            2 * e - ema(e, period)
                        else
                            if type == "TEMA"
                                e = ema(source, period)
                                3 * (e - ema(e, period)) + ema(ema(e, period), period)

MA1 = getMA(MA1Type,MA1Source,MA1Period)
MA2 = getMA(MA2Type,MA2Source,MA2Period)
MA3 = getMA(MA3Type,MA3Source,MA3Period)


transparency = 100
breakLines= "\n\n"

// truncate() truncates a given number
// to a certain number of decimals
truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor

// Plotting crossover/unders for all combinations of crosses
// https://www.tradingview.com/pine-script-reference/v4/#fun_label%7Bdot%7Dnew
if ShowCrosses and MA1Visible and MA2Visible and crossunder(MA1, MA2) and rsi(close,14) > 50
    lun1 = label.new(bar_index, na, "Go Short\n"+tostring(truncate(MA1,2))+breakLines, 
      color=color.new(color.red, transparency), 
      textcolor=color.red,
      style=label.style_labeldown, size=size.normal)
    label.set_y(lun1, MA1)
if ShowCrosses and MA1Visible and MA2Visible and crossover(MA1, MA2) and rsi(close,14) < 60
    lup1 = label.new(bar_index, bar_index*2,  breakLines+"Go Long\n"+tostring(truncate(MA1,2)),
      color=color.new(color.green, transparency), 
      textcolor=color.green,
      style=label.style_labelup, size=size.normal)
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
