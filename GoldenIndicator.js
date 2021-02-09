//@version=4
study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

ShowCrosses = input(title="AI HELP EXPERIMENTAL*", type=input.bool, defval=true)
isForexPair = input(title="Forex Pair", type=input.bool, defval=false)

// MA#Period is a variable used to store the indicator lookback period.  In this case, from the input.
MA1Period = input(20, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)
MA1Visible = input(title="------------ MA1 Visible ------------", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA2Period = input(50, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)
MA2Visible = input(title="------------ MA2 Visible ------------", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA

MA3Period = input(150, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "DEMA", "TEMA"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)
MA3Visible = input(title="------------ MA3 Visible ------------", type=input.bool, defval=true) // Will automatically hide crossovers containing this MA


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


// truncate() truncates a given number to a certain number of decimals
truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor
    
    
long  = MA1 > MA2
short = MA1 < MA2

longCondition = not long[15]
shortCondition = not short[15]

// closeLong = MA1 < MA2 and not long[11]
// closeShort = MA1 > MA2 and not short[11]


// Plotting crossover/unders for all combinations of crosses
transparency = 0
longVOffset = isForexPair? 0 : 30
shortVOffset = isForexPair? 0 : 15
breakLines= ""
if(ShowCrosses)
    if rsi(close,14) >= 60 //and MA1 - MA2 < 6  and shortCondition
        lun1 = label.new(bar_index,high + shortVOffset, ""+tostring(truncate(MA1,2))+breakLines,color=color.new(color.red, transparency), textcolor=color.red, size=size.normal , style=label.style_arrowdown)
    if rsi(close,14) < 32 //and MA2 - MA1 < 10 and longCondition
        lup1 = label.new(bar_index, low - longVOffset,  breakLines+""+tostring(truncate(MA1,2)),color=color.new(color.green, transparency), textcolor=color.green, size=size.normal , style=label.style_arrowup)


plot(MA1Visible ? MA1 : na,color = color.green , linewidth = 2)
plot(MA2Visible ? MA2 : na,color = color.red , linewidth = 2)
plot(MA3Visible ? MA3 : na,color = color.blue , linewidth = 2)
