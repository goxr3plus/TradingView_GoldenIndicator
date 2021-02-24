//@version=4
study(shorttitle = "Golden Indicator", title="Tiple Moving Averages",overlay=true)

//-------------------- FUNCTIONS -----------------------------------------------

truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor
    
resolution(timeFrame) =>
    if timeFrame == "Current"
        timeframe.period
    else
        if timeFrame == "1m"
            "1"
        else
            if timeFrame == "3m"
                "3"
            else
                if timeFrame == "5m"
                    "5"
                else
                    if timeFrame == "15m"
                        "15"
                    else
                        if timeFrame == "30m"
                            "30"
                        else
                            if timeFrame == "45m"
                                "45"
                            else
                                if timeFrame == "1h"
                                    "60"
                                else
                                    if timeFrame == "2h"
                                        "120"
                                    else
                                        if timeFrame == "3h"
                                            "180"
                                        else
                                            if timeFrame == "4h"
                                                "240"
                                            else
                                                if timeFrame == "1D"
                                                    "1D"
                                                else
                                                    if timeFrame == "1W"
                                                        "1W"
                                                    else
                                                        if timeFrame == "1M"
                                                            "1M"
    
ma(type,source,period) =>
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

AIHelp = input(title="AI HELP EXPERIMENTAL*", type=input.bool, defval=true) 


MA1Visible = input(title="------------ Moving Average 1 Visible ------------", type=input.bool, defval=true)
MA1Period = input(20, title="Moving Average 1 Period")
MA1Type = input(title="Moving Average 1 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA1Source = input(title="Moving Average 1 Source", type=input.source, defval=close)
MA1TimeFrame = input(title="Moving Average 1 Timeframe", defval="Current", options=["Current", "1m", "3m", "5m", "15m", "30m", "45m", "1h", "2h", "3h", "4h", "1D", "1W", "1M"])

MA2Visible = input(title="------------ Moving Average 2 Visible ------------", type=input.bool, defval=true)
MA2Period = input(50, title="Moving Average 2 Period")
MA2Type = input(title="Moving Average 2 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA2Source = input(title="Moving Average 2 Source", type=input.source, defval=close)
MA2TimeFrame = input(title="Moving Average 2 Timefram", defval="Current", options=["Current", "1m", "3m", "5m", "15m", "30m", "45m", "1h", "2h", "3h", "4h", "1D", "1W", "1M"])


MA3Visible = input(title="------------ Moving Average 3 Visible ------------", type=input.bool, defval=true)
MA3Period = input(150, title="Moving Average 3 Period")
MA3Type = input(title="Moving Average 3 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA3Source = input(title="Moving Average 3 Source", type=input.source, defval=close)
MA3TimeFrame = input(title="Moving Average 3 Timeframe", defval="Current", options=["Current", "1m", "3m", "5m", "15m", "30m", "45m", "1h", "2h", "3h", "4h", "1D", "1W", "1M"])

MA4Visible = input(title="------------ Moving Average 4 Visible ------------", type=input.bool, defval=true)
MA4Period = input(200, title="Moving Average 4 Period")
MA4Type = input(title="Moving Average 4 Type", defval="EMA - Exponential Moving Average", options=["SMA - Simple Moving Average", "EMA - Exponential Moving Average","RMA - Rolling Moving Average",  "WMA - Weighted Moving Average", "HMA - Hull Moving Average", "DMA - Double Exponential Moving Average", "TMA - Triple Exponential Moving Average"])
MA4Source = input(title="Moving Average 4 Source", type=input.source, defval=close)
MA4TimeFrame = input(title="Moving Average 4 Timeframe", defval="Current", options=["Current", "1m", "3m", "5m", "15m", "30m", "45m", "1h", "2h", "3h", "4h", "1D", "1W", "1M"])


MA1 = security(syminfo.tickerid, resolution(MA1TimeFrame), ma(MA1Type, MA1Source, MA1Period))     
MA2 = security(syminfo.tickerid, resolution(MA2TimeFrame), ma(MA2Type, MA2Source, MA2Period))
MA3 = security(syminfo.tickerid, resolution(MA3TimeFrame), ma(MA3Type, MA3Source, MA3Period)) 
MA4 = security(syminfo.tickerid, resolution(MA4TimeFrame), ma(MA4Type, MA4Source, MA4Period)) 


//Draw the Moving Averages
maColorTransparency = 40
plot(MA1Visible ? MA1 : na,color = color.new(color.green, maColorTransparency),title="Moving Average 1 Color", linewidth = 3)
plot(MA2Visible ? MA2 : na,color = color.new(color.red, maColorTransparency),title="Moving Average 2 Color" , linewidth = 3)
plot(MA3Visible ? MA3 : na,color = color.new(color.blue, maColorTransparency),title="Moving Average 3 Color", linewidth = 3)
plot(MA4Visible ? MA4 : na,color = color.new(color.purple, maColorTransparency),title="Moving Average 4 Color", linewidth = 3)


//----------------------------- AI HELPER LONG AND SHORT POSITIONS -------------------------------------------------

long  = MA1 > MA2
short = MA1 < MA2

longCondition = not long[5]
shortCondition = not short[5]

// closeLong = MA1 < MA2 and not long[11]
// closeShort = MA1 > MA2 and not short[11]

isSuperPenny = high < 2
biggerThan20000 = high > 20000
longPositionVerticalOffset = (low*(isSuperPenny ? 1 : biggerThan20000 ? 18 : 8))/100 
shortPositionVerticalOffset =  (high*(isSuperPenny ? 1 : biggerThan20000 ? 15 : 5))/100

breakLines= ""
colorTransparency = 0

if(AIHelp)
    if rsi(close,14) >= 60 and short and not short[11] //and MA1 - MA2 < 6  and shortCondition
        lun1 = label.new(bar_index,high + shortPositionVerticalOffset,tostring(truncate(MA1,isSuperPenny?5:2))+breakLines,color=color.new(color.red, colorTransparency), textcolor=color.red, size=size.normal , style=label.style_arrowdown)
    if rsi(close,14) <= 30 and long //and MA2 - MA1 < 10 and longCondition
        lup1 = label.new(bar_index,low - longPositionVerticalOffset,  breakLines+""+tostring(truncate(MA1,isSuperPenny?5:2)),color=color.new(color.green, colorTransparency), textcolor=color.green, size=size.normal , style=label.style_arrowup)
        
// --------------------------  FORECASTING ------------------------------------------
ShowForecasts = input(title="------------ Show Forecasts ------------", type=input.bool, defval=true)

// RsiInfuenceBias = input(title="Calculate Bias based on RSI", type=input.bool, defval=true)
a = "Neutral"
// if RsiInfuenceBias == true
//     a = "Bullish"
ForecastBias = input(title="Forecast Bias", defval=a, options=["Neutral", "Bullish", "Bearish"])


ForecastBiasPeriod = input(14, title="Forecast Bias Period")
ForecastBiasMagnitude = input(1, title="Forecast Bias Magnitude", minval=0.25, maxval=20, step=0.25)

// Forecasting - forcasted prices are calculated using our MAType and MASource for the MAPeriod - the last X candles.
//              it essentially replaces the oldest X candles, with the selected source * X candles
// Bias - We'll add an "adjustment" for each additional candle being forecasted based on ATR of the previous X candles
// custom functions in  pine - https://www.tradingview.com/wiki/Declaring_Functions
bias(Bias, BiasPeriod) =>
    if Bias == "Neutral"
        0
    else
        if Bias == "Bullish"
            (atr(BiasPeriod) * ForecastBiasMagnitude)
        else
            if Bias == "Bearish"
                ((atr(BiasPeriod)  * ForecastBiasMagnitude) * -1) // multiplying by -1 to make it a negative, bearish bias
                
Bias = bias(ForecastBias, ForecastBiasPeriod) // 14 is default atr period

getForecast(type,source,period,number,timeframe) => (security(syminfo.tickerid, resolution(timeframe),ma(type, source, period - number) * (period - number) + ((source * number) + (Bias * number))) / period )

MA1Forecast1 = getForecast(MA1Type, MA1Source, MA1Period, 1, MA1TimeFrame)
MA1Forecast2 = getForecast(MA1Type, MA1Source, MA1Period, 2, MA1TimeFrame)
MA1Forecast3 = getForecast(MA1Type, MA1Source, MA1Period, 3, MA1TimeFrame)
MA1Forecast4 = getForecast(MA1Type, MA1Source, MA1Period, 4, MA1TimeFrame)
MA1Forecast5 = getForecast(MA1Type, MA1Source, MA1Period, 5, MA1TimeFrame)

plot(MA1TimeFrame == "Current" and ShowForecasts and MA1Visible ? MA1Forecast1 : na, color=color.green, linewidth=1, style=plot.style_circles, title="Moving Average 1 Forecast 1", offset=1, show_last=1)
plot(MA1TimeFrame == "Current" and ShowForecasts and MA1Visible ? MA1Forecast2 : na, color=color.green, linewidth=1, style=plot.style_circles, title="Moving Average 1 Forecast 2", offset=2, show_last=1)
plot(MA1TimeFrame == "Current" and ShowForecasts and MA1Visible ? MA1Forecast3 : na, color=color.green, linewidth=1, style=plot.style_circles, title="Moving Average 1 Forecast 3", offset=3, show_last=1)
plot(MA1TimeFrame == "Current" and ShowForecasts and MA1Visible ? MA1Forecast4 : na, color=color.green, linewidth=1, style=plot.style_circles, title="Moving Average 1 Forecast 4", offset=4, show_last=1)
plot(MA1TimeFrame == "Current" and ShowForecasts and MA1Visible ? MA1Forecast5 : na, color=color.green, linewidth=1, style=plot.style_circles, title="Moving Average 1 Forecast 5", offset=5, show_last=1)

MA2Forecast1 = getForecast(MA2Type, MA2Source, MA2Period, 1, MA2TimeFrame)
MA2Forecast2 = getForecast(MA2Type, MA2Source, MA2Period, 2, MA2TimeFrame)
MA2Forecast3 = getForecast(MA2Type, MA2Source, MA2Period, 3, MA2TimeFrame)
MA2Forecast4 = getForecast(MA2Type, MA2Source, MA2Period, 4, MA2TimeFrame)
MA2Forecast5 = getForecast(MA2Type, MA2Source, MA2Period, 5, MA2TimeFrame)

plot(MA2TimeFrame == "Current" and ShowForecasts and MA2Visible ? MA2Forecast1 : na, color=color.red, linewidth=1, style=plot.style_circles, title="Moving Average 2 Forecast 1", offset=1, show_last=1)
plot(MA2TimeFrame == "Current" and ShowForecasts and MA2Visible ? MA2Forecast2 : na, color=color.red, linewidth=1, style=plot.style_circles, title="Moving Average 2 Forecast 2", offset=2, show_last=1)
plot(MA2TimeFrame == "Current" and ShowForecasts and MA2Visible ? MA2Forecast3 : na, color=color.red, linewidth=1, style=plot.style_circles, title="Moving Average 2 Forecast 3", offset=3, show_last=1)
plot(MA2TimeFrame == "Current" and ShowForecasts and MA2Visible ? MA2Forecast4 : na, color=color.red, linewidth=1, style=plot.style_circles, title="Moving Average 2 Forecast 4", offset=4, show_last=1)
plot(MA2TimeFrame == "Current" and ShowForecasts and MA2Visible ? MA2Forecast5 : na, color=color.red, linewidth=1, style=plot.style_circles, title="Moving Average 2 Forecast 5", offset=5, show_last=1)

MA3Forecast1 = getForecast(MA3Type, MA3Source, MA3Period, 1, MA3TimeFrame)
MA3Forecast2 = getForecast(MA3Type, MA3Source, MA3Period, 2, MA3TimeFrame)
MA3Forecast3 = getForecast(MA3Type, MA3Source, MA3Period, 3, MA3TimeFrame)
MA3Forecast4 = getForecast(MA3Type, MA3Source, MA3Period, 4, MA3TimeFrame)
MA3Forecast5 = getForecast(MA3Type, MA3Source, MA3Period, 5, MA3TimeFrame)

plot(MA3TimeFrame == "Current" and ShowForecasts and MA3Visible ? MA3Forecast1 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="Moving Average 3 Forecast 1", offset=1, show_last=1)
plot(MA3TimeFrame == "Current" and ShowForecasts and MA3Visible ? MA3Forecast2 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="Moving Average 3 Forecast 2", offset=2, show_last=1)
plot(MA3TimeFrame == "Current" and ShowForecasts and MA3Visible ? MA3Forecast3 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="Moving Average 3 Forecast 2", offset=3, show_last=1)
plot(MA3TimeFrame == "Current" and ShowForecasts and MA3Visible ? MA3Forecast4 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="Moving Average 3 Forecast 4", offset=4, show_last=1)
plot(MA3TimeFrame == "Current" and ShowForecasts and MA3Visible ? MA3Forecast5 : na, color=color.blue, linewidth=1, style=plot.style_circles, title="Moving Average 3 Forecast 5", offset=5, show_last=1)

MA4Forecast1 = getForecast(MA4Type, MA4Source, MA4Period, 1, MA4TimeFrame)
MA4Forecast2 = getForecast(MA4Type, MA4Source, MA4Period, 2, MA4TimeFrame)
MA4Forecast3 = getForecast(MA4Type, MA4Source, MA4Period, 3, MA4TimeFrame)
MA4Forecast4 = getForecast(MA4Type, MA4Source, MA4Period, 4, MA4TimeFrame)
MA4Forecast5 = getForecast(MA4Type, MA4Source, MA4Period, 5, MA4TimeFrame)

plot(MA4TimeFrame == "Current" and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.purple, linewidth=1, style=plot.style_circles, title="Moving Average 4 Forecast 1", offset=1, show_last=1)
plot(MA4TimeFrame == "Current" and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.purple, linewidth=1, style=plot.style_circles, title="Moving Average 4 Forecast 2", offset=2, show_last=1)
plot(MA4TimeFrame == "Current" and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.purple, linewidth=1, style=plot.style_circles, title="Moving Average 4 Forecast 2", offset=3, show_last=1)
plot(MA4TimeFrame == "Current" and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.purple, linewidth=1, style=plot.style_circles, title="Moving Average 4 Forecast 4", offset=4, show_last=1)
plot(MA4TimeFrame == "Current" and ShowForecasts and MA4Visible ? MA4Forecast1 : na, color=color.purple, linewidth=1, style=plot.style_circles, title="Moving Average 4 Forecast 5", offset=5, show_last=1)


//  result = (ma(MA1Type, MA1Source, MA1Period - 1) * (MA1Period - 1) + ((MA1Source * 1) + (Bias * 1)))/20
// label.new(bar_index, high + 15, tostring(5))
