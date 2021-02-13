//@version=4
study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

//-------------------- FUNCTIONS -----------------------------------------------

truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor
    
getMA(type,source,period) =>
    if type == "SMA - Simple Moving Average"
        sma(source, period)
    else
        if type == "HMA - Hull Moving Average"
            wma(2*wma(source, period/2)-wma(source, period), round(sqrt(period))) 
        else
            if type == "DMA - Double Exponential Moving Average"
                e = ema(source, period)
                2 * e - ema(e, period)
            else
                if type == "TMA - Triple Exponential Moving Average"
                    e = ema(source, period)
                    3 * (e - ema(e, period)) + ema(ema(e, period), period)
                else
                    if type == "WMA - Weighted Moving Average"
                        wma(source, period)
                    else
                        if type == "RMA - Rolling Moving Average"
                            rma(source, period)
                        else
                            if type == "EMA - Exponential Moving Average"
                                ema(source, period)
    

//-------------------- INPUTS -----------------------------------------------

AIHelp = input(title="AI HELP EXPERIMENTAL*", type=input.bool, defval=false)
isForexPair = input(title="Forex Pair", type=input.bool, defval=false)

MA1Visible = input(title="------------ MA1 Visible ------------", type=input.bool, defval=true)
MA1Period = input(20, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA1Source = input(title="MA1 Source", type=input.source, defval=close)

MA2Visible = input(title="------------ MA2 Visible ------------", type=input.bool, defval=true)
MA2Period = input(50, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA2Source = input(title="MA2 Source", type=input.source, defval=close)

MA3Visible = input(title="------------ MA3 Visible ------------", type=input.bool, defval=true)
MA3Period = input(150, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA3Source = input(title="MA3 Source", type=input.source, defval=close)

MA1 = getMA(MA1Type,MA1Source,MA1Period)  
MA2 = getMA(MA2Type,MA2Source,MA2Period)
MA3 = getMA(MA3Type,MA3Source,MA3Period)

//Draw the Moving Averages
plot(MA1Visible ? MA1 : na,color = color.green , linewidth = 2)
plot(MA2Visible ? MA2 : na,color = color.red , linewidth = 2)
plot(MA3Visible ? MA3 : na,color = color.blue , linewidth = 2)


//-------------------- AI VARIABLES -----------------------------------------------

long  = MA1 > MA2
short = MA1 < MA2

longCondition = not long[15]
shortCondition = not short[15]

// closeLong = MA1 < MA2 and not long[11]
// closeShort = MA1 > MA2 and not short[11]

longPositionVerticalOffset = isForexPair? 0 : 30
shortPositionVerticalOffset = isForexPair? 0 : 15

breakLines= ""
colorTransparency = 0

//-------------------- AI DRAW-----------------------------------------------

if(AIHelp)
    if rsi(close,14) >= 60 and MA1 - MA2 < 6  and shortCondition
        lun1 = label.new(bar_index,high + shortPositionVerticalOffset, ""+tostring(truncate(MA1,2))+breakLines,color=color.new(color.red, colorTransparency), textcolor=color.red, size=size.normal , style=label.style_arrowdown)
    if rsi(close,14) < 32 and MA2 - MA1 < 10 and longCondition
        lup1 = label.new(bar_index, low - longPositionVerticalOffset,  breakLines+""+tostring(truncate(MA1,2)),color=color.new(color.green, colorTransparency), textcolor=color.green, size=size.normal , style=label.style_arrowup)
