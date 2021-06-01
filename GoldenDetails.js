//@version=4
study("Golden Details", overlay=true)


transparency = input(title="Box transparency", type=input.integer, defval=99 , group = "Box")
borderWidth = input(title="Box border", type=input.integer, defval=-10 , group = "Box")
// frameWidth = input(title="Box width", type=input.integer, defval=20 , group = "Box")

var table perfTable = table.new(position.top_right, 5 , 5, border_width =  borderWidth , frame_width = 30)


positiveColor = input(color.rgb(38, 166, 154), title="Positive Color" ,  group = "Box")
negativeColor = input(color.rgb(240, 83, 80), title="Negative Color" ,  group = "Box")


addRow(tablee, column, row, value, timeframe) =>
    color = value >= 35 ? positiveColor : negativeColor
    text = tostring(value, "#") + "%\n" + timeframe
    table.cell(tablee, column, row, text, bgcolor = color.new(color, transparency), text_color = color, width = 25)


up = rma(max(change(close), 0), 14)
down = rma(-min(change(close), 0), 14)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

// rsi_htf = security(syminfo.tickerid, htf, rsi(src, len), lookahead = false)

if barstate.islast
    addRow(perfTable, 0, 0,  rsi , "")
    // addRow(perfTable, 1, 0, 6, "15m")
    // addRow(perfTable, 2, 0, 7, "H")
    // addRow(perfTable, 3, 0, 8, "D")
